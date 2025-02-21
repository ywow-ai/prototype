import { useEffect } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

import configEnv from '@src/configs/env';
import configModules from '@src/configs/modules';
import { useDispatch, useSelectorAuth } from '@src/helpers/vendor';
import BlankLayout from '@src/layouts/BlankLayout';
import { actionUser } from '@src/reducers/user';

interface Props {
  fetching?: boolean;
}

const Fallback = ({ fetching }: Props) => {
  const dispatch = useDispatch();
  const { module, token } = useSelectorAuth();
  const modules = configModules.filter((filter) => filter.code === module);
  const getModule: { display?: string; logo?: string } = modules.length < 1 ? {} : modules[0];

  useEffect(() => {
    if (token && fetching) {
      const fetchFallbackData = async () => {
        try {
          const response = await fetch(${configEnv.URL}/flush-cache, {
            method: 'POST',
            headers: { Authorization: token },
          });
          await response.json();
        } catch (error) {
          dispatch(actionUser.update());
        }
      };

      fetchFallbackData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <BlankLayout>
      <Box className="flex flex-col items-center text-center">
        <div className="flex gap-4 items-center mb-4">
          <img
            alt="Fallback"
            src={getModule.logo || configEnv.ICON}
            style={{ width: 80, height: 80, objectFit: 'contain' }}
            loading="lazy"
          />

          <div className="flex flex-col items-start">
            <Typography variant="h4" gutterBottom className="font-bold text-2xl mt-3 mb-0">
              {getModule?.display ?? configEnv.NAME}
            </Typography>

            <Typography variant="h4" gutterBottom className="mb-4 font-bold text-xl mt-0">
              {configEnv.COMPANY}
            </Typography>
          </div>
        </div>

        <Box className="w-[90%]">
          <LinearProgress className="h-2 rounded-md" />
        </Box>
      </Box>
    </BlankLayout>
  );
};

export default Fallback;