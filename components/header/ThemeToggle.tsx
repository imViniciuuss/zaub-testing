'use client';

import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useColorScheme } from '@mui/material/styles';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { mode, setMode, systemMode } = useColorScheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const resolvedMode = mode === 'system' ? systemMode : mode;
  const isDark = resolvedMode === 'dark';

  const toggle = () => {
    setMode(isDark ? 'light' : 'dark');
  };

  if (!mounted) {
    return (
      <IconButton aria-hidden disabled sx={{ visibility: 'hidden' }}>
        <DarkModeOutlinedIcon />
      </IconButton>
    );
  }

  return (
    <Tooltip title={isDark ? 'Light mode' : 'Dark mode'}>
      <IconButton onClick={toggle} aria-label="Toggle theme">
        {isDark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>
    </Tooltip>
  );
}