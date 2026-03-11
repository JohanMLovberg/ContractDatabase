import * as React from "react";
import "./HoverCard.scss";
import { IPersonaProps } from "office-ui-fabric-react";

export interface IUserHoverCardProps {
  item: IPersonaProps;
  children?: React.ReactNode;
}

export default function HoverCard(props: IUserHoverCardProps) {
  const { item, children } = props;

  return (
    <div className="hoverWrapper">
      {children}
      <div className="hoverCard">
        <div className="hoverTop">
          <div className="hoverName">{item.primaryText}</div>
          <div className="hoverTitle">{item.tertiaryText}</div>
        </div>
        <div className="hoverDivider"></div>
        <div className="hoverInfo">
          <div className="hoverRow">
            <span className="hoverLabel">Email:</span> 
            <span className="hoverValue">{item.secondaryText}</span>
          </div>
          <div className="hoverRow">
            <span className="hoverLabel">Login:</span> 
            <span className="hoverValue">{item.optionalText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}