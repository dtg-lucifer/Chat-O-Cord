import "../../_globals.scss"

const Loading = () => {
  return (
    <main className="loading__wrapper">
      <div>
        <span className="loader"></span>
        <div>Please wait while we fetch your details...</div>
      </div>
    </main>
  );
};

export default Loading;