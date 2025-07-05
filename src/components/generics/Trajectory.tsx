import { useState, useEffect } from "react";
import { ButtonGroup } from "@primitives/ButtonGroup";
import type { TrajectoryModel } from "@data/data";
import { TrajectoryType } from "@data/enums";
import type {
  ButtonResources,
  BasicTranslateComponentProps,
} from "@data/props";
import { getLangFromUrl, useTranslations } from "src/i18n/utils";
import { TrajectoryCard } from "@ui/TrajectoryCard";
import fetchApi from "@lib/strapi";

const TrajectorySection: React.FC<BasicTranslateComponentProps> = ({ url }) => {
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);

  const [activeFilter, setActiveFilter] = useState<TrajectoryType>(
    TrajectoryType.Experience,
  );
  const [trajectories, setTrajectories] = useState<TrajectoryModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleFilterChange = (newFilter: TrajectoryType) => {
    setActiveFilter(newFilter);
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
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const filteredTrajectories = await fetchApi<TrajectoryModel[]>({
          endpoint: "trajectories",
          query: {
            populate: "thumbnail",
            filters: {
              trajectories: {
                $containsi: String(activeFilter),
              },
            },
            sort: ["startDate:desc"],
          },
          wrappedByKey: "data",
          lang: lang,
        });
        setTrajectories(filteredTrajectories);
      } catch (err) {
        setError(`No se pudieron cargar los proyectos. ${err}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, [activeFilter]);

  return (
    <section className="container my-10 space-y-10">
      <h4 className="text-primary-700 font-title text-center text-4xl font-medium">
        {t("trajectory.title")}
      </h4>
      <div className="flex w-full justify-center">
        <ButtonGroup<TrajectoryType>
          Selected={activeFilter}
          onClick={handleFilterChange}
          items={filterOptions}
          resources={filterOptionsResources}
        />
      </div>
      <div>
        {loading && (
          <div className="font-body space-y-3 py-10 text-center text-neutral-500">
            <p className="text-2xl">(˃ ⤙ ˂)</p>
            <p className="text-center">
              {t("trajectory.api.loadingTrajectories")}
            </p>
          </div>
        )}
        {error && (
          <div className="font-body space-y-3 py-10 text-center text-neutral-500">
            <span className="text-2xl">(—ᴗ—ᵕ)</span>
            <h6 className="text-2xl font-medium">
              {t("trajectory.api.errorTitle")}
            </h6>
            <p>{t("trajectory.api.errorDesc")}</p>
          </div>
        )}
        {!loading && !error && trajectories && (
          <div className="grid gap-x-4 gap-y-10 lg:grid-cols-2">
            {trajectories.map((trajectory, index) => (
              <TrajectoryCard trajectory={trajectory} key={index} url={url} />
            ))}
          </div>
        )}
        {!loading && !error && (!trajectories || trajectories.length < 1) && (
          <div className="font-body space-y-3 py-10 text-center text-neutral-500">
            <p className="text-2xl">(¬_¬")</p>
            <p>{t("trajectory.api.notFoundTrajectories")}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrajectorySection;
