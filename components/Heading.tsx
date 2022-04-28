import { ElementType, HTMLAttributes } from 'react';

interface HeadingProps extends HTMLAttributes<HTMLOrSVGElement> {
  tag?: ElementType,
  text: string
}

const Heading = ({ tag: Tag = 'h1', text } : HeadingProps) => {
  return <Tag> {text}</Tag>;
};

export default Heading;
