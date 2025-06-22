import React, { useState, useEffect } from "react";
import { ButtonGroup } from "@primitives/ButtonGroup";
import { Trajectories } from "src/data/static/TrajectoryData";
import type { TrajectoryModel } from "@data/data";
import { TrajectoryType } from "@data/enums";
import type {
  ButtonResources,
  BasicTranslateComponentProps,
} from "@data/props";
import { getLangFromUrl, useTranslations } from "src/i18n/utils";
import { TrajectoryCard } from "../ui/TrajectoryCard";

const ServiceSection: React.FC<BasicTranslateComponentProps> = ({ url }) => {
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);

  const initialFilter: TrajectoryType = TrajectoryType.Experience;
  const [filteredTrajectories, setFilteredTrajectories] = useState<
    TrajectoryModel[]
  >([]);
  const [filter, setFilter] = useState<TrajectoryType>(initialFilter);

  useEffect(() => {
    const translateTrajectories = Trajectories.filter(
      (collection) => collection.lang == lang,
    );
    const filtered = translateTrajectories
      .map((colllection) => {
        return colllection.Trajectories.filter(
          (trajectory) => trajectory.Type === filter,
        ).sort((a, b) => b.StartDate.valueOf() - a.StartDate.valueOf());
      })
      .flat();
    setFilteredTrajectories(filtered);
  }, [filter]);

  const handleFilterChange = (newFilter: TrajectoryType) => {
    setFilter(newFilter);
  };

  const filterOptions = [
    TrajectoryType.Experience,
    TrajectoryType.Studies,
    TrajectoryType.Certificates,
  ];

  const filterOptionsResources: ButtonResources<TrajectoryType>[] = [
    {
      resource: t("enum.TrajectoryType.Experience"),
      type: TrajectoryType.Experience,
    },
    {
      resource: t("enum.TrajectoryType.Studies"),
      type: TrajectoryType.Studies,
    },
    {
      resource: t("enum.TrajectoryType.Certificates"),
      type: TrajectoryType.Certificates,
    },
  ];

  return (
    <section className="container my-10 space-y-10">
      <h4 className="text-primary-700 font-title text-center text-4xl font-medium">
        {t("trajectory,title")}
      </h4>
      <div className="flex w-full justify-center">
        <ButtonGroup<TrajectoryType>
          Selected={filter}
          onClick={handleFilterChange}
          items={filterOptions}
          resources={filterOptionsResources}
        />
      </div>
      <div className="grid gap-x-4 gap-y-10 lg:grid-cols-2">
        {filteredTrajectories.map((trajectory, index) => (
          <TrajectoryCard trajectory={trajectory} key={index} url={url} />
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
