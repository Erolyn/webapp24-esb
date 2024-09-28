import React, { PropsWithChildren } from "react";
import { ProjectProps } from "../types";

export default function Project(
  props: Readonly<PropsWithChildren<ProjectProps>>
) {
  return (
    <article>
      {!props.image ? (
        <img
          src="https://via.placeholder.com/150"
          alt="Placeholder for Project"
        />
      ) : (
        <img src={props.image} alt={`Image for ${props.title}`} />
      )}
      <section>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </section>
      {props.children}
    </article>
  );
}
