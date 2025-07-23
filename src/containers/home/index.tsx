// src/containers/home/index.tsx
import { Button } from "@/components/ui/button";
import { globalActions } from "@/containers/global/slice";
import NoDataAvailable from "@/shared/components/NoData";
import {
  openViewVaultExplorer,
  viewTXInExplorer,
} from "@/shared/utils/viewVaultInExplorer";
import { Award, Crown, Play, Users } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalSelectors } from "../global/selectors";

const HomePage = () => {
  const dispatch = useDispatch();
  const movieData = useSelector(GlobalSelectors.movieData);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const attachmentInfo = useSelector(GlobalSelectors.attachmentInfo);

  const handlePurchaseClick = () => {
    dispatch(globalActions.setIsPurchaseModalOpen(true));
  };

  const handlePlayVideo = () => {
    if (videoRef.current) {
      setIsVideoPlaying(true);
      videoRef.current.play();
    }
  };

  const handleViewVault = () => {
    try {
      openViewVaultExplorer();
    } catch (error) {
      console.error("Error opening vault explorer:", error);
      alert("Could not open vault explorer");
    }
  };

  const handleViewAttachmentTx = () => {
    try {
      const attachmentTxHash = attachmentInfo?.tx_hash;

      if (!attachmentTxHash || attachmentTxHash === "sample_tx_hash") {
        alert("No attachment transaction available to view");
        return;
      }

      viewTXInExplorer(attachmentTxHash);
    } catch (error) {
      console.error("Error opening attachment transaction:", error);
      alert("Could not open attachment transaction");
    }
  };

  if (!movieData) {
    return (
      <div className="min-h-screen bg-godfather-dark flex items-center justify-center">
        <div className="text-godfather-gold text-center">
          <p className="text-xl">Loading cinematic experience...</p>
        </div>
      </div>
    );
  }

  const { movieInfo, video, images } = movieData;

  // Check if we're using test data
  if (movieInfo.title === "Test Data") {
    return <NoDataAvailable message="Movie Data Unavailable" />;
  }

  return (
    <div className="min-h-screen bg-godfather-dark text-godfather-cream">
      {/* Cinematic Hero Section */}
      <section className="godfather-hero-section">
        {/* Dramatic Background */}
        {images.length > 0 && (
          <div className="godfather-hero-bg">
            <img
              src={URL.createObjectURL(images[0].blob)}
              alt={movieInfo.title}
              className="godfather-hero-image"
            />
            <div className="godfather-overlay"></div>
          </div>
        )}

        <div className="godfather-hero-content">
          {/* Prestigious Awards */}
          <div className="godfather-awards-panel">
            <div className="awards-header">
              <Crown className="w-8 h-8 text-godfather-gold" />
              <span className="awards-title">FESTIVAL HONORS</span>
            </div>
            {movieInfo.festivals.slice(0, 4).map((festival, index) => (
              <div key={index} className="award-medallion">
                <Award className="w-6 h-6 text-godfather-gold mb-2" />
                <div className="award-text">
                  <div className="award-name">{festival.name}</div>
                  <div className="award-honor">{festival.award}</div>
                  <div className="award-year">{festival.year}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Majestic Title Treatment */}
          <div className="godfather-title-treatment">
            <div className="franchise-heritage">
              <span className="heritage-line"></span>
              <span className="heritage-text">
                THE LEGENDARY SAGA CONCLUDES
              </span>
              <span className="heritage-line"></span>
            </div>
            <h1 className="godfather-main-title">THE</h1>
            <h1 className="godfather-sub-title">GODFATHER</h1>
            <div className="chapter-number">IV</div>
            <p className="director-credit">
              DIRECTED BY{" "}
              <span className="director-name">
                {movieInfo.director.toUpperCase()}
              </span>
            </p>
          </div>

          {/* Character Showcase */}
          <div className="character-showcase">
            <div className="cast-header">
              <Users className="w-6 h-6 text-godfather-gold" />
              <span className="cast-title">LEGENDARY CAST</span>
            </div>
            <div className="cast-grid">
              {movieInfo.cast.slice(0, 6).map((actor, index) => (
                <div key={index} className="cast-member">
                  <span className="actor-name">{actor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Epic Quotes Section */}
      <section className="godfather-quotes-section">
        <div className="container mx-auto px-4">
          <div className="quotes-content">
            <div className="quote-block-main">
              <div className="quote-ornament-left"></div>
              <blockquote className="godfather-quote">
                <p className="quote-text">"{movieInfo.quotes[0].text}"</p>
              </blockquote>
              <div className="quote-ornament-right"></div>
              <footer className="quote-attribution">
                — {movieInfo.quotes[0].author}
              </footer>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Opportunity Section */}
      <section className="godfather-investment-section">
        <div className="container mx-auto px-4">
          <div className="investment-content">
            <div className="investment-header">
              <h2 className="investment-title">
                OWN A PIECE OF CINEMA HISTORY
              </h2>
              <p className="investment-subtitle">
                Become part of the most anticipated conclusion in film history
              </p>
            </div>

            <div className="investment-details">
              <div className="investment-card">
                <div className="card-icon">
                  <Crown className="w-8 h-8 text-godfather-gold" />
                </div>
                <div className="card-content">
                  <h3 className="card-title">Total Ownership Shares</h3>
                  <div className="card-value">
                    {movieInfo.totalFractions.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="investment-card">
                <div className="card-icon">
                  <Award className="w-8 h-8 text-godfather-gold" />
                </div>
                <div className="card-content">
                  <h3 className="card-title">Available Shares</h3>
                  <div className="card-value">
                    {movieInfo.availableFractions.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="investment-card">
                <div className="card-icon">
                  <Users className="w-8 h-8 text-godfather-gold" />
                </div>
                <div className="card-content">
                  <h3 className="card-title">Price per Share</h3>
                  <div className="card-value">
                    {movieInfo.pricePerFraction} ETH
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={handlePurchaseClick}
              className="godfather-cta-button"
            >
              ACQUIRE OWNERSHIP SHARES
            </Button>
          </div>
        </div>
      </section>

      {/* Blockchain Verification */}
      <section className="godfather-verification-section">
        <div className="container mx-auto px-4 text-center">
          <h3 className="verification-title">AUTHENTICATED ON BLOCKCHAIN</h3>
          <p className="verification-description">
            Your ownership is secured and verified through immutable blockchain
            technology
          </p>
          <div className="verification-actions">
            <Button onClick={handleViewVault} className="verification-btn">
              VIEW VAULT CERTIFICATE
            </Button>
            <Button
              onClick={handleViewAttachmentTx}
              className="verification-btn"
            >
              VERIFY TRANSACTION
            </Button>
          </div>
        </div>
      </section>

      {/* Exclusive Trailer Section */}
      {video && (
        <section className="godfather-trailer-section">
          <div className="container mx-auto px-4">
            <div className="trailer-showcase">
              <div className="trailer-introduction">
                <h2 className="trailer-heading">EXCLUSIVE PREVIEW</h2>
                <p className="trailer-description">
                  Witness the epic conclusion of the Corleone legacy in this
                  exclusive trailer
                </p>
              </div>

              <div className="cinematic-player">
                <div className="player-frame">
                  {!isVideoPlaying && images[0] && (
                    <img
                      src={URL.createObjectURL(images[0].blob)}
                      alt="Trailer Preview"
                      className="trailer-poster"
                    />
                  )}
                  <video
                    ref={videoRef}
                    className="trailer-video"
                    controls={isVideoPlaying}
                    poster={
                      images[0]
                        ? URL.createObjectURL(images[0].blob)
                        : undefined
                    }
                    preload="metadata"
                    style={{ display: isVideoPlaying ? "block" : "none" }}
                  >
                    <source
                      src={URL.createObjectURL(video.blob)}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {!isVideoPlaying && (
                  <div className="player-overlay">
                    <div className="trailer-info">
                      <div className="trailer-title">The Godfather 4</div>
                      <div className="trailer-subtitle">Official Trailer</div>
                    </div>
                    <Button
                      onClick={handlePlayVideo}
                      className="cinematic-play-btn"
                    >
                      <Play className="w-8 h-8" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Director's Vision */}
      <section className="godfather-vision-section">
        <div className="container mx-auto px-4">
          <div className="vision-content">
            <div className="vision-text">
              <h2 className="vision-title">DIRECTOR'S VISION</h2>

              <div className="vision-quote">
                <p className="vision-opening">"{movieInfo.quotes[2].text}"</p>
                <cite className="vision-cite">
                  — {movieInfo.quotes[2].author}
                </cite>
              </div>

              <div className="vision-description">
                <p>
                  After decades of contemplation, Francis Ford Coppola returns
                  to conclude the most influential crime saga in cinema history.
                  The Godfather 4 represents not just a film, but a meditation
                  on power, family, and the weight of legacy that spans
                  generations.
                </p>

                <p>
                  Set against the backdrop of modern America, this final chapter
                  explores how the sins of the past echo through time, affecting
                  not just the Corleone family, but the very fabric of power
                  itself. It is a story of redemption, of reckoning, and of the
                  ultimate price of absolute power.
                </p>

                <p>
                  With master cinematographer and a cast that bridges
                  generations of talent, The Godfather 4 promises to deliver the
                  epic scope and intimate character study that has made the
                  franchise legendary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Quote */}
      <section className="godfather-legacy-section">
        <div className="container mx-auto px-4">
          <div className="legacy-content">
            <div className="legacy-ornament-top"></div>
            <blockquote className="legacy-quote">
              <p>"{movieInfo.quotes[1].text}"</p>
            </blockquote>
            <div className="legacy-ornament-bottom"></div>
            <footer className="legacy-attribution">
              — {movieInfo.quotes[1].author}
            </footer>
          </div>
        </div>
      </section>

      {/* About the Final Chapter */}
      <section className="godfather-about-section">
        <div className="container mx-auto px-4">
          <div className="about-layout">
            <div className="about-header">
              <h2 className="about-title">THE FINAL CHAPTER</h2>
            </div>

            <div className="about-narrative">
              <p className="about-opening">{movieInfo.longDescription}</p>

              <p className="about-cast-intro">
                The film brings together legendary performers{" "}
                {movieInfo.cast.slice(0, 4).join(", ")}, and introduces a new
                generation of talent including{" "}
                {movieInfo.cast.slice(4, 8).join(", ")}, creating a bridge
                between the classic era and contemporary cinema.
              </p>

              <p className="about-conclusion">
                This is more than a film—it is a cultural event, the completion
                of a story that has defined what it means to explore power,
                family, and the American Dream through the lens of cinema. The
                Godfather 4 stands as both a worthy conclusion to the saga and a
                standalone masterpiece that will resonate for generations to
                come.
              </p>
            </div>

            {/* Film Details */}
            <div className="film-details">
              <div className="detail-item">
                <span className="detail-label">Runtime</span>
                <span className="detail-value">{movieInfo.duration}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Genre</span>
                <span className="detail-value">{movieInfo.genre}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Release Year</span>
                <span className="detail-value">{movieInfo.year}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
