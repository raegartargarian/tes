// src/shared/components/PurchaseModal.tsx
import { Button } from "@/components/ui/button";
import { GlobalSelectors } from "@/containers/global/selectors";
import { globalActions } from "@/containers/global/slice";
import {
  AlertTriangle,
  Award,
  Calculator,
  CheckCircle,
  Crown,
  Info,
  Minus,
  Plus,
  Shield,
  Timer,
  TrendingUp,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const PurchaseModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(GlobalSelectors.isPurchaseModalOpen);
  const movieData = useSelector(GlobalSelectors.movieData);
  const authData = useSelector(GlobalSelectors.authData);

  const [shares, setShares] = useState(1);
  const [_, setIsPurchasing] = useState(false);
  const [step, setStep] = useState<
    "select" | "confirm" | "processing" | "success"
  >("select");

  const movieInfo = movieData?.movieInfo;
  const pricePerShare = movieInfo?.pricePerFraction || 0.025;
  const totalCost = shares * pricePerShare;
  const estimatedReturns = totalCost * 1.15; // 15% projected return
  const availableShares = movieInfo?.availableFractions || 11250;

  useEffect(() => {
    if (!isOpen) {
      setStep("select");
      setShares(1);
    }
  }, [isOpen]);

  const handleClose = () => {
    dispatch(globalActions.setIsPurchaseModalOpen(false));
  };

  const handleSharesChange = (value: string) => {
    const numValue = parseInt(value) || 1;
    const maxShares = Math.min(1000, availableShares); // Cap at 1000 or available
    setShares(Math.max(1, Math.min(numValue, maxShares)));
  };

  const handlePurchase = async () => {
    if (!authData?.isAuthenticated) {
      alert("Please connect your wallet first");
      return;
    }

    if (!window.ethereum) {
      alert("MetaMask not detected. Please install MetaMask to proceed.");
      return;
    }

    setIsPurchasing(true);
    setStep("processing");

    try {
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const priceInWei = (totalCost * Math.pow(10, 18)).toString(); // Convert ETH to Wei

      // Mock transaction parameters for demo
      const transactionParameters = {
        to: "0x742d35Cc6634C0532925a3b8D8fA3b1E0a8eb942", // Demo recipient address
        from: window.ethereum.selectedAddress,
        value: "0x" + parseInt(priceInWei).toString(16), // Convert to hex
        gas: "0x5208", // 21000 gas limit (standard transfer)
        gasPrice: "0x59682F00", // 1.5 Gwei
        data: "0x", // No data for simple transfer
      };

      // Send transaction
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      console.log("Transaction Hash:", txHash);
      setStep("success");
    } catch (error: any) {
      console.error("Transaction failed:", error);
      if (error.code === 4001) {
        alert("Transaction rejected by user.");
      } else {
        alert("Transaction failed. Please try again.");
      }
      setStep("select");
    } finally {
      setIsPurchasing(false);
    }
  };

  const renderSelectStep = () => (
    <div className="purchase-select-step">
      <div className="modal-header">
        <div className="header-icon">
          <Crown className="w-8 h-8 text-godfather-gold" />
        </div>
        <div className="header-content">
          <h2 className="modal-title">Acquire Ownership Shares</h2>
          <p className="modal-subtitle">
            Invest in The Godfather 4 - The Epic Conclusion
          </p>
        </div>
      </div>

      <div className="investment-overview">
        <div className="overview-stats">
          <div className="stat-item">
            <Award className="w-5 h-5 text-godfather-gold" />
            <div>
              <span className="stat-label">Total Shares</span>
              <span className="stat-value">
                {movieInfo?.totalFractions.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="stat-item">
            <Users className="w-5 h-5 text-godfather-gold" />
            <div>
              <span className="stat-label">Available</span>
              <span className="stat-value">
                {availableShares.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="stat-item">
            <TrendingUp className="w-5 h-5 text-godfather-gold" />
            <div>
              <span className="stat-label">Price per Share</span>
              <span className="stat-value">{pricePerShare} ETH</span>
            </div>
          </div>
        </div>
      </div>

      <div className="purchase-calculator">
        <div className="calculator-header">
          <Calculator className="w-5 h-5 text-godfather-gold" />
          <h3>Investment Calculator</h3>
        </div>

        <div className="shares-input-section">
          <label htmlFor="shares" className="input-label">
            Number of Shares
          </label>
          <div className="shares-input-container">
            <button
              onClick={() => setShares(Math.max(1, shares - 1))}
              className="input-btn"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              id="shares"
              type="number"
              min="1"
              max={Math.min(1000, availableShares)}
              value={shares}
              onChange={(e) => handleSharesChange(e.target.value)}
              className="shares-input"
            />
            <button
              onClick={() =>
                setShares(Math.min(Math.min(1000, availableShares), shares + 1))
              }
              className="input-btn"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="input-hint">
            Maximum: {Math.min(1000, availableShares).toLocaleString()} shares
          </span>
        </div>

        <div className="investment-breakdown">
          <div className="breakdown-row">
            <span>Share Price</span>
            <span>{pricePerShare} ETH</span>
          </div>
          <div className="breakdown-row">
            <span>Quantity</span>
            <span>{shares.toLocaleString()}</span>
          </div>
          <div className="breakdown-row total-row">
            <span>Total Investment</span>
            <span>{totalCost.toFixed(6)} ETH</span>
          </div>
          <div className="breakdown-row projected-row">
            <span>Projected Return*</span>
            <span>{estimatedReturns.toFixed(6)} ETH</span>
          </div>
        </div>

        <div className="risk-disclaimer">
          <Info className="w-4 h-4 text-godfather-gold" />
          <span>
            *Projected returns are estimates and not guaranteed. All investments
            carry risk.
          </span>
        </div>
      </div>

      <div className="modal-actions">
        <Button
          onClick={() => setStep("confirm")}
          disabled={!authData?.isAuthenticated}
          className="purchase-btn-primary"
        >
          <Wallet className="w-5 h-5 mr-2" />
          {authData?.isAuthenticated
            ? "Review Purchase"
            : "Connect Wallet First"}
        </Button>
        <Button onClick={handleClose} className="purchase-btn-secondary">
          Cancel
        </Button>
      </div>
    </div>
  );

  const renderConfirmStep = () => (
    <div className="purchase-confirm-step">
      <div className="confirm-header">
        <Shield className="w-8 h-8 text-godfather-gold" />
        <h2 className="confirm-title">Confirm Your Investment</h2>
        <p className="confirm-subtitle">Please review your purchase details</p>
      </div>

      <div className="purchase-summary">
        <div className="summary-card">
          <h3 className="summary-title">Investment Summary</h3>
          <div className="summary-details">
            <div className="detail-row">
              <span>Film</span>
              <span>The Godfather 4</span>
            </div>
            <div className="detail-row">
              <span>Shares</span>
              <span>{shares.toLocaleString()}</span>
            </div>
            <div className="detail-row">
              <span>Price per Share</span>
              <span>{pricePerShare} ETH</span>
            </div>
            <div className="detail-row total-highlight">
              <span>Total Cost</span>
              <span>{totalCost.toFixed(6)} ETH</span>
            </div>
          </div>
        </div>

        <div className="investment-benefits">
          <h4 className="benefits-title">Your Investment Includes:</h4>
          <div className="benefits-list">
            <div className="benefit-item">
              <CheckCircle className="w-5 h-5 text-godfather-gold" />
              <span>Ownership certificate on blockchain</span>
            </div>
            <div className="benefit-item">
              <CheckCircle className="w-5 h-5 text-godfather-gold" />
              <span>Potential profit sharing from film revenue</span>
            </div>
            <div className="benefit-item">
              <CheckCircle className="w-5 h-5 text-godfather-gold" />
              <span>Exclusive access to behind-the-scenes content</span>
            </div>
            <div className="benefit-item">
              <CheckCircle className="w-5 h-5 text-godfather-gold" />
              <span>Transferable digital ownership rights</span>
            </div>
          </div>
        </div>

        <div className="risk-warning">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <div className="warning-content">
            <h4>Investment Risk Notice</h4>
            <p>
              Film investments carry significant risk. Returns are not
              guaranteed and you may lose your entire investment. Please invest
              responsibly.
            </p>
          </div>
        </div>
      </div>

      <div className="confirm-actions">
        <Button onClick={handlePurchase} className="confirm-purchase-btn">
          <Wallet className="w-5 h-5 mr-2" />
          Confirm Purchase ({totalCost.toFixed(4)} ETH)
        </Button>
        <Button onClick={() => setStep("select")} className="back-btn">
          Back to Edit
        </Button>
      </div>
    </div>
  );

  const renderProcessingStep = () => (
    <div className="purchase-processing-step">
      <div className="processing-content">
        <div className="processing-icon">
          <Timer className="w-12 h-12 text-godfather-gold animate-spin" />
        </div>
        <h2 className="processing-title">Processing Your Investment</h2>
        <p className="processing-subtitle">
          Please confirm the transaction in your wallet and wait for blockchain
          confirmation
        </p>

        <div className="processing-steps">
          <div className="step-item active">
            <div className="step-number">1</div>
            <span>Wallet confirmation</span>
          </div>
          <div className="step-item">
            <div className="step-number">2</div>
            <span>Blockchain processing</span>
          </div>
          <div className="step-item">
            <div className="step-number">3</div>
            <span>Share certificate generation</span>
          </div>
        </div>

        <div className="processing-note">
          <Info className="w-4 h-4 text-godfather-gold" />
          <span>
            This may take a few minutes. Please do not close this window.
          </span>
        </div>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="purchase-success-step">
      <div className="success-content">
        <div className="success-icon">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h2 className="success-title">Investment Successful!</h2>
        <p className="success-subtitle">
          You now own {shares.toLocaleString()} shares of The Godfather 4
        </p>

        <div className="success-details">
          <div className="success-card">
            <Crown className="w-8 h-8 text-godfather-gold mb-4" />
            <h3>Your Ownership Certificate</h3>
            <p>
              Your shares have been recorded on the blockchain and you will
              receive your digital certificate shortly.
            </p>
          </div>
        </div>

        <div className="success-actions">
          <Button className="view-portfolio-btn">
            <Shield className="w-5 h-5 mr-2" />
            View Portfolio
          </Button>
          <Button onClick={handleClose} className="close-btn">
            Close
          </Button>
        </div>
      </div>
    </div>
  );

  if (!isOpen || !movieData) return null;

  return (
    <div className="godfather-purchase-modal-overlay">
      <div className="godfather-purchase-modal">
        {/* Close Button */}
        <button onClick={handleClose} className="modal-close-btn">
          <X className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <div className="modal-content">
          {step === "select" && renderSelectStep()}
          {step === "confirm" && renderConfirmStep()}
          {step === "processing" && renderProcessingStep()}
          {step === "success" && renderSuccessStep()}
        </div>
      </div>
    </div>
  );
};
