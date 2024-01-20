import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase, subtitle2 }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 20px" padding="20px">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap="10px"
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: colors.grey[100] }}
        >
          {title}
        </Typography>
        <Box flex="1" alignSelf="center" marginTop="10px">
          <ProgressCircle progress={progress} />
        </Box>
        <Box textAlign="center" position={"relative"}>
          <Typography
            variant="h5"
            position={"absolute"}
            top={-75}
            left={-20}
            // className={"translate(-50%, -50%)"}

            // transform={"translate(-50%, -50%)"}
            fontStyle="italic"
            fontSize="20px"
            sx={{ color: colors.greenAccent[600] }}
          >
            {progress * 100}%
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt="2px"
        flexDirection="column"
      >
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          marginTop="10px"
          variant="h5"
          sx={{ color: colors.blueAccent[500] }}
        >
          Prof. {subtitle2}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
