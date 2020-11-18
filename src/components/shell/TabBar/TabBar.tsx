import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FavoriteIcon from "@material-ui/icons/Favorite";
// import LocationOnIcon from "@material-ui/icons/LocationOn";
import RestoreIcon from "@material-ui/icons/Restore";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState("");
  const location = useLocation();
  const history = useHistory();

  React.useEffect(() => {
    setValue(location.pathname);
  }, [location]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        history.push(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction
        value="/words/memorize"
        label="记单词"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        value="/words/my-words"
        label="我的单词"
        icon={<FavoriteIcon />}
      />
      {/* <BottomNavigationAction
        value="/words/statistics"
        label="统计"
        icon={<LocationOnIcon />}
      /> */}
    </BottomNavigation>
  );
}
