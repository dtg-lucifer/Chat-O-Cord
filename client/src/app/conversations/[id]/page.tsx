const page = ({ params }: { params: { id: string } }) => {
  return <div>Conversation id: {params.id}</div>;
};

export default page;
