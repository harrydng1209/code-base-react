interface IProps {
  path: string;
}

type TIcons = Record<string, () => Promise<{ ReactComponent: React.FC<TSvgProps> }>>;
type TSvgProps = React.SVGProps<SVGSVGElement>;

const BaseIconSvg: React.FC<IProps & TSvgProps> = (props) => {
  const { path, ...otherProps } = props;

  const [IconComponent, setIconComponent] = useState<null | React.FC<TSvgProps>>(null);
  const icons = import.meta.glob('../../assets/icons/**/*.svg') as TIcons;

  useEffect(() => {
    (async () => {
      const importPath = `../../assets/icons/${path}.svg`;
      const iconLoader = icons[importPath];

      if (!iconLoader) {
        setIconComponent(null);
        return;
      }

      const component = await iconLoader();
      setIconComponent(() => component.ReactComponent);
    })();
  }, [path]);

  return (
    <>
      {IconComponent && (
        <IconComponent className="tw-cursor-pointer tw-outline-none" {...otherProps} />
      )}
    </>
  );
};

export default BaseIconSvg;
