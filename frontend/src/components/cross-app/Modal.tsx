import Settings from "../feed/_components/Settings";
import UpdatePostFom from "../feed/_feedForm/UpdatePostFom";
import { XCircle } from "lucide-react";
import useAppStore, { ModalSectionType } from "../../stores/AppStore";

const MAP_MODALS: Record<
  NonNullable<ModalSectionType>,
  { element: JSX.Element; title: string }
> = {
  SETTINGS: {
    element: <Settings />,
    title: "Settings ",
  },
  UPDATE_POST_FORM: {
    element: <UpdatePostFom />,
    title: "Update Post",
  },
};

const Modal = () => {
  const { modalSection, setModal } = useAppStore();
  const modal = modalSection && MAP_MODALS[modalSection];
  return (
    <div className={`modal__panel ${modalSection ? "show" : null}`}>
      <div className="modal__card">
        <div className="modal__card__top">
          <h1>{modal?.title}</h1>
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
        {modal?.element}
      </div>
    </div>
  );
};

export default Modal;
