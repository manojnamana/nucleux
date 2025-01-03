/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React, { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  styled,
  useTheme,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Collapse,
  Paper,
  Stack} from '@mui/material';
import {
  BookOpen,
  FileAudio,
  BrainCircuit,
  MessageSquare,
  ChevronRight,
  Search,
  Menu,
  X,
  Clock,
  Star,
  Folder,
  FileText,
  Calendar,
  Settings,
  Home,
  AlertCircle,
  PlusCircle,
  Users,
  GraduationCap
} from 'lucide-react';

const LIBRARY_SECTIONS = {
  "Basic Sciences": {
    "Anatomy": ["Upper Limb", "Lower Limb", "Thorax", "Abdomen"],
    "Physiology": ["Cardiovascular", "Respiratory", "Renal", "Endocrine"],
    "Pathology": ["General Pathology", "Systemic Pathology", "Clinical Pathology"]
  },
  "Clinical Medicine": {
    "Internal Medicine": ["Cardiology", "Pulmonology", "Gastroenterology"],
    "Surgery": ["General Surgery", "Orthopedics", "Neurosurgery"],
    "Emergency Medicine": ["Trauma", "Critical Care", "Procedures"]
  },
  "Clinical Skills": {
    "Physical Examination": ["General Exam", "System-wise Examination"],
    "Procedures": ["Basic Procedures", "Advanced Procedures"],
    "Communication": ["Patient History", "Case Presentation"]
  }
};

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ec4899',
    },
    secondary: {
      main: '#f97316',
    },
    background: {
      default: '#000000',
      paper: '#111827',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

const GradientText = styled(Typography)(({  }) => ({
  background: 'linear-gradient(45deg, #ec4899, #f97316, #3b82f6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}));

const NavMenuItem = ({ icon: Icon, label, isActive = false, onClick, hasSubitems = false }) => {
  const theme = useTheme();
  
  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        borderRadius: 2,
        mb: 1,
        color: isActive ? 'primary.main' : 'text.secondary',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
        <Icon size={20} />
      </ListItemIcon>
      <ListItemText primary={label} />
      {hasSubitems && (
        <ChevronRight
          size={16}
          style={{
            transform: isActive ? 'rotate(90deg)' : 'none',
            transition: theme.transitions.create('transform'),
          }}
        />
      )}
    </ListItemButton>
  );
};

const CollapsibleLibrary = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSubsection, setSelectedSubsection] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSectionClick = (section) => {
    setSelectedSection(section === selectedSection ? null : section);
    setSelectedSubsection(null);
    setSelectedTopic(null);
  };

  const handleSubsectionClick = (subsection) => {
    setSelectedSubsection(subsection === selectedSubsection ? null : subsection);
    setSelectedTopic(null);
  };

  const drawerWidth = isSidebarOpen ? 240 : 73;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              transition: theme => theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
        >
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {isSidebarOpen ? (
              <GradientText variant="h6" fontWeight="bold">
                MediLearn
              </GradientText>
            ) : (
              <GraduationCap size={24} color={darkTheme.palette.primary.main} />
            )}
            <IconButton onClick={() => setSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </IconButton>
          </Box>

          <List sx={{ px: 2 }}>
            <NavMenuItem icon={Home} label={isSidebarOpen ? "Dashboard" : ""} />
            <NavMenuItem icon={BookOpen} label={isSidebarOpen ? "Library" : ""} isActive={true} />
            <NavMenuItem icon={FileAudio} label={isSidebarOpen ? "Audio Lectures" : ""} />
            <NavMenuItem icon={BrainCircuit} label={isSidebarOpen ? "MCQs" : ""} />
            <NavMenuItem icon={MessageSquare} label={isSidebarOpen ? "Discussions" : ""} />
            <NavMenuItem icon={Calendar} label={isSidebarOpen ? "Calendar" : ""} />
            <NavMenuItem icon={Users} label={isSidebarOpen ? "Study Groups" : ""} />
            <NavMenuItem icon={Settings} label={isSidebarOpen ? "Settings" : ""} />
          </List>
        </Drawer>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Paper sx={{ p: 2 }}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                placeholder="Search library..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={20} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                startIcon={<PlusCircle size={20} />}
                sx={{
                  background: 'linear-gradient(45deg, #ec4899, #f97316, #3b82f6)',
                  color: 'black',
                  '&:hover': {
                    opacity: 0.9,
                  },
                }}
              >
                New Note
              </Button>
            </Stack>
          </Paper>

          <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            <Paper sx={{ width: 240, overflow: 'auto' }}>
              <List>
                {Object.keys(LIBRARY_SECTIONS).map((section) => (
                  <React.Fragment key={section}>
                    <NavMenuItem
                      icon={Folder}
                      label={section}
                      isActive={selectedSection === section}
                      onClick={() => handleSectionClick(section)}
                      hasSubitems={true}
                    />
                    <Collapse in={selectedSection === section}>
                      <List sx={{ pl: 2 }}>
                        {Object.keys(LIBRARY_SECTIONS[section]).map((subsection) => (
                          <NavMenuItem
                            key={subsection}
                            icon={FileText}
                            label={subsection}
                            isActive={selectedSubsection === subsection}
                            onClick={() => handleSubsectionClick(subsection)}
                            hasSubitems={true}
                          />
                        ))}
                      </List>
                    </Collapse>
                  </React.Fragment>
                ))}
              </List>
            </Paper>

            {selectedSection && selectedSubsection && (
              <Paper sx={{ width: 240, overflow: 'auto' }}>
                <List>
                  {LIBRARY_SECTIONS[selectedSection][selectedSubsection].map((topic) => (
                    <ListItemButton
                      key={topic}
                      onClick={() => setSelectedTopic(topic)}
                      selected={selectedTopic === topic}
                      sx={{
                        borderRadius: 1,
                        m: 1,
                      }}
                    >
                      <ListItemText primary={topic} />
                    </ListItemButton>
                  ))}
                </List>
              </Paper>
            )}

            <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
              {selectedTopic ? (
                <Box>
                  <GradientText variant="h4" gutterBottom fontWeight="bold">
                    {selectedTopic}
                  </GradientText>
                  <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Clock size={16} />
                      <Typography variant="body2" color="text.secondary">
                        15 min read
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Star size={16} />
                      <Typography variant="body2" color="text.secondary">
                        Save for later
                      </Typography>
                    </Stack>
                  </Stack>
                  <Typography color="text.secondary">
                    Select a topic to start learning.
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Stack alignItems="center" spacing={2}>
                    <AlertCircle size={48} color={darkTheme.palette.text.disabled} />
                    <Typography color="text.secondary">
                      Select a topic to start learning
                    </Typography>
                  </Stack>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CollapsibleLibrary;