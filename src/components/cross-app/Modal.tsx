import Settings from "../feed/_components/Settings";
import { XCircle } from "lucide-react";
import useAppStore, { ModalSectionType } from "../../stores/AppStore";

const MAP_MODALS: Record<NonNullable<ModalSectionType>, JSX.Element> = {
  SETTINGS: <Settings />,
  PROFILE: <Settings />,
};

const Modal = () => {
  const { modalSection, setModal } = useAppStore();
  return (
    <div className={`modal__panel ${modalSection ? "show" : null}`}>
      <div className="modal__card">
        <div className="modal__card__top">
          <h1>Settings</h1>
          <div className="actions">
            <button
              type="button"
              className="action"
              onClick={() => setModal(null)}
            >
              <XCircle size={20} />
            </button>
          </div>
        </div>
        {modalSection && MAP_MODALS[modalSection]}
      </div>
    </div>
  );
};

export default Modal;
