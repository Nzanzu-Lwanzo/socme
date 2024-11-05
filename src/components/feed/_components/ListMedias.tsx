import ImageChosen from "../_components/ChosenMediaElt";
import useFeedFormStore from "../../../stores/FeedFormStore";

const ListMedias = () => {
  const { files, removeFile } = useFeedFormStore();

  return (
    <>
      {files.length > 2 ? (
        <>
          <ImageChosen
            file={files.at(0)!}
            key={files.at(0)?.id}
            removeFile={removeFile}
          />
          <ImageChosen
            file={files.at(1)!}
            isPlaceholder={true}
            remainingFiles={files.length - 1}
            key={files.at(1)?.id}
            removeFile={removeFile}
          />
        </>
      ) : (
        <>
          {files.map((file) => {
            return (
              <ImageChosen key={file.id} file={file} removeFile={removeFile} />
            );
          })}
        </>
      )}
    </>
  );
};

export default ListMedias;
