import { Grid } from "@material-ui/core";
import { useRecoilValue } from "recoil";
import userAtom from "recoil/user";

export const Dashboard = () => {
  const user = useRecoilValue(userAtom);

  return (
    // TODO: вынести числа в константы
    <Grid container spacing={2} columns={16}>
      <Grid item xs={3}>
        {user.name}
      </Grid>
      <Grid item>

      </Grid>
    </Grid>
  );
};
