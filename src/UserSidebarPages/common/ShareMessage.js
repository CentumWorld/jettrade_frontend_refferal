import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import "./ShareMessage.css";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  InstapaperShareButton,
} from "react-share";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ShareMessage = ({ openSharModal, handleClose, referralID }) => {
  const [userType, setUserType] = useState("Referral");

  const shareUrl = "http://trader.jettradefx.in/user-registration";
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(openSharModal);
  }, [openSharModal]);

  const handleFacebookShare = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      "Click out this link" + shareUrl || ""
    )}&quote=${encodeURIComponent(referralID || "")}`;
    window.open(facebookShareUrl, "_blank");
  };

  const handleTwitterShare = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(referralID)}`;
    window.open(twitterShareUrl, "_blank");
  };

  const handleLinkedinShare = () => {
    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(referralID)}`;
    window.open(linkedinShareUrl, "_blank");
  };

  const handleWhatsappShare = () => {
    const whatsappMessage = `Check out this link: ${shareUrl} Referral Type ${userType} Referral ID ${referralID}`;
    const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappShareUrl, '_blank');
  };

  const handleInstapaperShare = () => {
    const instapaperShareUrl = `https://www.instapaper.com/edit?url=${encodeURIComponent(
      shareUrl
    )}&title=${encodeURIComponent(referralID)}`;
    window.open(instapaperShareUrl, "_blank");
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Share"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className="share-icon">
              <WhatsappShareButton
                url={shareUrl}
                title={referralID}
                onClick={handleWhatsappShare}
              >
                <div className="social-icon whatsapp">
                  <FaWhatsapp size={32} />
                </div>
              </WhatsappShareButton>
              <FacebookShareButton
                url={shareUrl}
                quote={referralID}
                onClick={handleFacebookShare}
              >
                <div className="social-icon facebook">
                  <FaFacebook size={32} />
                </div>
              </FacebookShareButton>
              <InstapaperShareButton
                url={shareUrl}
                quote={referralID}
                onClick={handleInstapaperShare}
              >
                <div className="social-icon instagram">
                  <FaInstagram size={32} />
                </div>
              </InstapaperShareButton>
              <TwitterShareButton
                url={shareUrl}
                title={referralID}
                onClick={handleTwitterShare}
              >
                <div className="social-icon twitter">
                  <FaTwitter size={32} />
                </div>
              </TwitterShareButton>

              <LinkedinShareButton
                url={shareUrl}
                title={referralID}
                onClick={handleLinkedinShare}
              >
                <div className="social-icon linkedin">
                  <FaLinkedin size={32} />
                </div>
              </LinkedinShareButton>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ShareMessage