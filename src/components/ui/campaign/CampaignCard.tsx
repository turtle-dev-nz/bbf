
import "./CampaignCard.css";

interface CampaignCardProps {
  children: React.ReactNode;
  className?: string;
}

const CampaignCard = ({ children, className = "" }: CampaignCardProps) => {
  return <article className={`campaign-card ${className}`}>{children}</article>;
};

export default CampaignCard;
