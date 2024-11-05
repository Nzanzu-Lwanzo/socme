import { default as SettingsComponent } from "../components/feed/_components/Settings";
import MobilePagesSubTopBar from "../components/cross-app/MobilePagesSubTopBar";
import "../assets/style/perPage/settings.scss";


const Settings = () => {
  return (
    <main className="settings__page">
      <MobilePagesSubTopBar title="Settings" />
      <div className="container">
        <SettingsComponent></SettingsComponent>
      </div>
    </main>
  );
};

export default Settings;
