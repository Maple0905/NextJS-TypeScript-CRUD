type Props = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export default function Post({ id, body, title }: Props) {
  return (
    <div>
      <h3>{id} {title}</h3>
      <p>{body}</p>
    </div>
  );
}
