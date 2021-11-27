interface Props {
  children: JSX.Element;
}

export const Main = (props: Props) => {
  return <main className="p-5">{props.children}</main>;
};
