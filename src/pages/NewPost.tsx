import Form from "../components/feed/_feedForm/Form";
import "../assets/style/perPage/newpost.scss";
import MobilePagesSubTopBar from "../components/cross-app/MobilePagesSubTopBar";

const NewPost = () => {
  return (
    <main className="new__post">
      <MobilePagesSubTopBar title="New Post"/>
      <div className="form__wrapper">
        <Form></Form>
      </div>
    </main>
  );
};

export default NewPost;
