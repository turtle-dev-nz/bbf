import { useState } from "react";
import "./CampaignCard.css";
import { motion } from "framer-motion";

interface CampaignCardProps {
  children: React.ReactNode;
  className?: string;
}

const CampaignCard = ({ children, className = "" }: CampaignCardProps) => {
  return <article className={`campaign-card ${className}`}>{children}</article>;
};

export default CampaignCard;
