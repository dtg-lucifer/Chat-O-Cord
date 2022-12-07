import "../styles/_globals.scss"

const Loading = () => {
  return (
    <main className="loading__wrapper">
      <div>
        <span className="loader"></span>
        <div>Please wait ...</div>
      </div>
    </main>
  );
};

export default Loading;
