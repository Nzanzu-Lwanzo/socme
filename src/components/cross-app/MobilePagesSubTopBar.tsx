import { Link } from "react-router-dom";
import { House } from "lucide-react";
import { PropsWithChildren } from "react";

interface Props {
  title: string;
}

const MobilePagesSubTopBar = ({
  children,
  title,
}: PropsWithChildren<Props>) => {
  return (
    <div className="mobile__pages__sub__topbar">
      <h2>{title}</h2>
      <div className="actions">
        {children}
        <Link to="/" className="action">
          <House size={20} />
        </Link>
      </div>
    </div>
  );
};

export default MobilePagesSubTopBar;
