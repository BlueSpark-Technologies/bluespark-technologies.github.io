import React from 'react'
import Image from "next/image";

export const ProjectDetails = ({image, description}) => {
  return (
    <section className="mil-p-60-0">
        <div className="container mil-p-0-120">
          <div className="mil-image-frame mil-horizontal mil-up">
            <Image
              fill
              src={image.src}
              alt={image.alt}
            />
          </div>
          <div className="pt-2">
            <p className="mil-text-lg"><span className="mil-dark mil-bold">Client: </span>{description.client}</p>
            <p className="mil-text-lg"><span className="mil-dark mil-bold">Industry: </span>{description.industry}</p>
            <p className="mil-text-lg"><span className="mil-dark mil-bold">Solution: </span>{description.solution}</p>
            <p className="mil-text-lg"><span className="mil-dark mil-bold">Objectives: </span>{description.objectives}</p>
            <p className="mil-text-lg mil-bold mil-dark mt-4">Challenges:</p>
            {description.challenges.map((item, key) => (
              <p key={`challenges-item-${key}`} className="mil-text-lg" dangerouslySetInnerHTML={{__html: item}}/>
            ))}
            <p className="mil-text-lg mil-bold mil-dark mt-4">Solution Details:</p>
            {description.solutionDetails.map((item, key) => (
              <p key={`solution-details-item-${key}`} className="mil-text-lg" dangerouslySetInnerHTML={{__html: item}}/>
            ))}
          </div>
        </div>
      </section>
  )
}
