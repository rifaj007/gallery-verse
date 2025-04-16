import { CircularProgress, Stack } from "@mui/material";

const loading = () => {
  return (
    <Stack direction="row" alignItems="center">
      <CircularProgress size="3rem" />
    </Stack>
  );
};

export default loading;
