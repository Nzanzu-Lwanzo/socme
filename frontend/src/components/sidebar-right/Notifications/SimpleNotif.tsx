import { XCircle } from "lucide-react";

const SimpleNotif = ({ verb }: { verb: "liked" | "disliked" }) => {
  return (
    <li className="simple__notif">
      <p>
        <span className="user__name">Nzanzu Lwanzo</span> has {verb} a post of
        yours
      </p>
      <button type="button" className="icon">
        <XCircle size={18} />
      </button>
    </li>
  );
};

export default SimpleNotif;
