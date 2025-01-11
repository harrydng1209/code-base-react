import { Breadcrumb } from 'antd';
import { Link } from 'react-router';

const TheBreadcrumb: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const pathNames = location.pathname.split('/').filter((item) => item);
  const items = [
    { title: <Link to={constants.routePages.HOME}>{t('shared.navigator.home')}</Link> },
    ...pathNames.map((path) => ({
      title: <Link to={`/${path}`}>{t(`shared.navigator.${path}`)}</Link>
    }))
  ];

  return <Breadcrumb items={items} />;
};

export default TheBreadcrumb;
