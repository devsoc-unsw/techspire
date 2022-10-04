import { PropsWithChildren } from "react";

interface Props {
  className?: string;
}

const Card = ({ className = "", children }: PropsWithChildren<Props>) => (
  <div className={`absolute rounded bg-card p-2 shadow-lg ${className}`}>
    <p>alskdjasl dkjasd alsdkf jlasjf liawejf a</p>
    <p>alskdjasl dkjasd alsdkf jlasjf liawejf a</p>
    <p>alskdjasl dkjasd alsdkf jlasjf liawejf a</p>
    <p>THIS IS A CARD</p>
    {children}
  </div>
);

export default Card;
