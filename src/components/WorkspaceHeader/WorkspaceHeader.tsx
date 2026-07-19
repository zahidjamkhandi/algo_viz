import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import './WorkspaceHeader.scss';

interface WorkspaceHeaderProps {
  title: string;
  currentModule?: string;
}

export const WorkspaceHeader = ({ title, currentModule }: WorkspaceHeaderProps) => {
  return (
    <header className="workspace-header" role="banner">
      <nav className="workspace-header__nav" aria-label="Main navigation">
        <Link
          to={ROUTES.HOME}
          className="workspace-header__brand"
          aria-label="Navigate to Landing Page"
        >
          <span className="workspace-header__brand-text">algo_viz</span>
        </Link>

        <div className="workspace-header__center" aria-hidden="true">
          <span className="workspace-header__app-name">algo_viz</span>
        </div>

        <div className="workspace-header__title">
          <span className="workspace-header__title-text">{title}</span>
        </div>
      </nav>
    </header>
  );
};
