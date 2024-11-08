import { memo } from "react";
import { LogOut, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { COLOR_SCHEMA } from "../../../utils/constants";
import useAppStore from "../../../stores/AppStore";
import { useLogUserOut } from "../../../hooks/userHooks";
import Loader from "../../cross-app/Loader";

const BottomActions = memo(() => {
  const setModal = useAppStore((state) => state.setModal);
  const { logout, status: isLoggingOut } = useLogUserOut();
  return (
    <div className="gen__actions">
      <Link to="/profile" className="action">
        <User size={20} stroke={COLOR_SCHEMA.white} />
      </Link>
      <button
        type="button"
        className="action"
        onClick={() => setModal("SETTINGS")}
      >
        <Settings size={20} stroke={COLOR_SCHEMA.white} />
      </button>
      <button type="button" className="action" onClick={logout}>
        {isLoggingOut === "pending" ? (
          <Loader height={23} width={23} />
        ) : (
          <LogOut size={20} stroke={COLOR_SCHEMA.white} />
        )}
      </button>
    </div>
  );
});

export default BottomActions;
