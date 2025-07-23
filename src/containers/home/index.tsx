// src/containers/home/index.tsx
import casino from "@/assets/images/casino.png";
import Fellas from "@/assets/images/fellas.png";
import God1 from "@/assets/images/god1.png";
import God2 from "@/assets/images/god2.png";
import God3 from "@/assets/images/god3.png";
import heat from "@/assets/images/heat.png";

import { Button } from "@/components/ui/button";
import { globalActions } from "@/containers/global/slice";
import NoDataAvailable from "@/shared/components/NoData";
import {
  openViewVaultExplorer,
  viewTXInExplorer,
} from "@/shared/utils/viewVaultInExplorer";
import { Award, Crown, Play, Star, TrendingUp } from "lucide-react";
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

  if (movieInfo.title === "Test Data") {
    return <NoDataAvailable message="Movie Data Unavailable" />;
  }

  return (
    <div className="min-h-screen bg-godfather-dark text-godfather-cream">
      {/* Cinematic Hero Section */}
      <section className="gambino-hero-section">
        {images.length > 0 && (
          <div className="gambino-hero-bg">
            <img
              src={URL.createObjectURL(images[0].blob)}
              alt={movieInfo.title}
              className="gambino-hero-image"
            />
            <div className="gambino-overlay"></div>
          </div>
        )}

        <div className="gambino-hero-content">
          {/* Awards Panel */}
          <div className="gambino-awards-panel">
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

          {/* Main Title Treatment */}
          <div className="gambino-title-treatment">
            <div className="franchise-heritage">
              <span className="heritage-line"></span>
              <span className="heritage-text">
                THE MAFIA STORY YOU'VE NEVER BEEN TOLD
              </span>
              <span className="heritage-line"></span>
            </div>
            <h1 className="gambino-main-title">{movieInfo.title}</h1>
            <h2 className="gambino-subtitle">{movieInfo.subtitle}</h2>
            <p className="director-credit">
              DIRECTED BY{" "}
              <span className="director-name">
                {movieInfo.director.toUpperCase()}
              </span>
            </p>
          </div>

          {/* Reviews Showcase */}
          <div className="gambino-reviews-panel">
            <div className="reviews-header">
              <Star className="w-6 h-6 text-godfather-gold" />
              <span className="reviews-title">INDUSTRY ACCLAIM</span>
            </div>
            {movieInfo.reviews?.slice(0, 3).map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-publication">{review.publication}</div>
                <div className="review-quote">"{review.quote}"</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Synopsis Section */}
      <section className="gambino-synopsis-section">
        <div className="container mx-auto px-4">
          <div className="synopsis-header">
            <h2 className="synopsis-title">SYNOPSIS</h2>
            <p className="synopsis-tagline">"{movieInfo.description}"</p>
          </div>
          <div className="synopsis-content">
            <p className="synopsis-text">{movieInfo.longDescription}</p>
          </div>
        </div>
      </section>

      {/* Comparatives Section */}
      <section className="gambino-comparatives-section">
        <div className="container mx-auto px-4">
          <h2 className="comparatives-title">COMPARATIVES FOR GAMBINO</h2>
          <div className="comparatives-grid">
            {movieInfo.comparatives?.map((comp, index) => (
              <div key={index} className="comparative-card">
                <div className="comparative-poster">
                  {/* Placeholder for movie poster */}
                  <div className="poster-placeholder">
                    {/* for index 0, put God1 and so on */}
                    <img
                      src={
                        index === 0
                          ? God1
                          : index === 1
                            ? God2
                            : index === 2
                              ? God3
                              : index === 3
                                ? Fellas
                                : index === 4
                                  ? casino
                                  : heat
                      }
                      alt={comp.title}
                    />
                  </div>
                </div>
                <div className="comparative-details">
                  <h3 className="comparative-title">{comp.title}</h3>
                  {comp.awards && (
                    <p className="comparative-awards">Awards: {comp.awards}</p>
                  )}
                  {comp.domestic && (
                    <p className="comparative-box-office">
                      Domestic Box Office: {comp.domestic}
                    </p>
                  )}
                  {comp.international && (
                    <p className="comparative-box-office">
                      International Box Office: {comp.international}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="note-disclaimer">
            <p className="disclaimer-text">
              *It is important to recognize that the total number for the
              International Box Office does not include any ancillary revenues.
            </p>
          </div>
        </div>
      </section>

      {/* Story of 20th Century America */}
      <section className="gambino-story-section">
        <div className="container mx-auto px-4">
          <h2 className="story-title">STORY OF 20TH CENTURY AMERICA</h2>

          <div className="story-content">
            <div className="story-text">
              <p className="story-opening">
                Much like his friend and boss of Chicago, Tony Accardo, Don
                Carlo implemented strict rules that respected families and
                disdained drug dealing. A devoted husband to Caterina
                ("Catherine") and father, Carlo emphasized a transition from
                bootlegging and racketeering into legitimate business. As a
                result, his descendants oversee companies with a combined worth
                of over one billion dollars, including trucking and food
                distribution businesses. He also organized the small shop owners
                in the Italian neighborhoods, and to this day, many pizzeria and
                funeral parlor chains owe their organized and continued success.
              </p>

              <p className="story-detail">
                Perhaps most importantly, in "Gambino," Carlo's story is played
                against the realities of the often-traumatizing Italian
                immigrant experience in early 20th century America. From job
                discrimination to language barriers to hostility from Irish, and
                from the Irish to the Italians and Chinese to the social
                hierarchy—a fact that young Carlo utilized to forge close
                relationships with both Black businessmen and the 'Godfather of
                Chinatown.' Before One, wars, to paraphrasing Machiavelli, the
                fastest way up the ladder. Imprisoned before World War Two,
                Carlo made a deal with Black safecrackers: they would steal
                coveted "ration stamps" and Carlo would sell them at a discount
                to the many ships in his vast network, splitting the take
                ～～～～ with ～～～～～ the ～～～～～～～～～～～～～～～～
                Blacks. The ships then cashed them in with the government at
                full value. With Qing, the Don helped the Chinese gangs collect
                their illegal imports (especially fabrics for their sweat shops)
                at the docks Carlo controlled. No other boss made these sorts of
                inter-racial alliances to the extent Carlo did.
              </p>
            </div>

            <div className="story-quote">
              <blockquote className="story-blockquote">
                <p>
                  One might say that "Gambino" does for Italians what
                  "Scorsese's "Gangs of New York" did for the Irish. Carlo was
                  no saint, to be certain, but he knew that saints rarely
                  survived the mean streets of America.
                </p>
                <p>
                  After seeing "Gambino," you will know everything about the New
                  York Mafia. Finally.
                </p>
              </blockquote>
              <cite className="story-cite">
                —Gus Russo,
                <br />
                Author of "The Outfit" and
                <br />
                "Supermob"
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Opportunity Section */}
      <section className="gambino-investment-section">
        <div className="container mx-auto px-4">
          <div className="investment-content">
            <div className="investment-header">
              <h2 className="investment-title">
                OWN A PIECE OF CINEMA HISTORY
              </h2>
              <p className="investment-subtitle">
                Invest in the most anticipated crime epic of 2025
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
                  <TrendingUp className="w-8 h-8 text-godfather-gold" />
                </div>
                <div className="card-content">
                  <h3 className="card-title">Price per Share</h3>
                  <div className="card-value">
                    ${movieInfo.pricePerFraction.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={handlePurchaseClick}
              className="gambino-cta-button"
            >
              ACQUIRE OWNERSHIP SHARES
            </Button>
          </div>
        </div>
      </section>

      {/* Blockchain Verification */}
      <section className="gambino-verification-section">
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
        <section className="gambino-trailer-section">
          <div className="container mx-auto px-4">
            <div className="trailer-showcase">
              <div className="trailer-introduction">
                <h2 className="trailer-heading">EXCLUSIVE PREVIEW</h2>
                <p className="trailer-description">
                  Witness the untold story of Carlo Gambino in this exclusive
                  trailer
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
                      <div className="trailer-title">{movieInfo.title}</div>
                      <div className="trailer-subtitle">
                        {movieInfo.subtitle}
                      </div>
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
    </div>
  );
};

export default HomePage;
