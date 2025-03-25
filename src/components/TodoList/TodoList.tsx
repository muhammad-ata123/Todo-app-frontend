/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TODOS } from '../../graphql/queries';
import { Todo } from '../../utils/todo.interface';
import TodoItem from './TodoItem';
import {
  Container,
  Typography,
  Box,
  Paper,
  InputBase,
  IconButton,
  useMediaQuery,
  Chip,
  Tabs,
  Tab,
  Alert,
  Skeleton
} from '@mui/material';
import { Search, FilterList, Sort } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  minHeight: 'calc(100vh - 128px)',
}));

const SearchPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  borderRadius: '12px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  transition: theme.transitions.create(['background-color', 'box-shadow']),
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

const TodoList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [tabValue, setTabValue] = useState<number>(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const { loading, error, data } = useQuery(GET_TODOS);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSelect = (id: string) => {
    navigate(`/todo/${id}`);
  };

  const filterTodos = (todos: Todo[], completed: boolean | null) => {
    return todos?.filter((todo: Todo) => {
      const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (completed !== null) {
        return matchesSearch && todo.completed === completed;
      }
      return matchesSearch;
    }) || [];
  };

  const allTodos = filterTodos(data?.todos, null);
  const activeTodos = filterTodos(data?.todos, false);
  const completedTodos = filterTodos(data?.todos, true);

  const getFilteredTodos = () => {
    switch (tabValue) {
      case 1: return activeTodos;
      case 2: return completedTodos;
      default: return allTodos;
    }
  };

  const currentTodos = getFilteredTodos();
  const skeletonCount = isMobile ? 3 : isTablet ? 4 : 6;

  const renderTodoList = (todos: Todo[]) => {
    if (loading) {
      return (
        <Box sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'
        }}>
          {Array.from(new Array(skeletonCount)).map((_, index) => (
            <Skeleton key={index} variant="rounded" height={150} />
          ))}
        </Box>
      );
    }

    if (todos.length > 0) {
      return (
        <Box sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'
        }}>
          {todos.map((todo: Todo) => (
            <TodoItem key={todo.id} todo={todo} onSelect={handleSelect} />
          ))}
        </Box>
      );
    }

    return (
      <Paper sx={{
        p: 4,
        textAlign: 'center',
        backgroundColor: theme.palette.mode === 'dark' ? 
          alpha(theme.palette.grey[800], 0.6) : 
          alpha(theme.palette.grey[50], 0.8),
        borderRadius: '16px',
        backdropFilter: 'blur(8px)'
      }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {searchTerm ? 'No matching tasks found' : 
           tabValue === 1 ? 'No active tasks' : 
           tabValue === 2 ? 'No completed tasks' : 'No tasks yet'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {searchTerm ? 'Try a different search term' : 'Create your first task'}
        </Typography>
      </Paper>
    );
  };

  return (
    <StyledContainer maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 800,
            color: 'text.primary',
            fontSize: isMobile ? '2rem' : '3rem',
            mb: 2,
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Your Tasks
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row', 
          gap: 2,
          alignItems: isMobile ? 'stretch' : 'center',
          mb: 3
        }}>
          <SearchPaper sx={{ flexGrow: 1 }}>
            <IconButton sx={{ p: '10px' }} aria-label="search">
              <Search />
            </IconButton>
            <InputBase
              fullWidth
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ ml: 1 }}
            />
            {/* <IconButton sx={{ p: '10px' }} aria-label="filter">
              <FilterList />
            </IconButton>
            <IconButton sx={{ p: '10px' }} aria-label="sort">
              <Sort />
            </IconButton> */}
          </SearchPaper>

          <Chip 
            label={`${currentTodos.length} ${tabValue === 1 ? 'active' : tabValue === 2 ? 'completed' : ''} tasks`} 
            color="primary" 
            variant="outlined"
            sx={{ 
              alignSelf: isMobile ? 'flex-end' : 'center',
              px: 2,
              py: 1.5,
              fontSize: '0.875rem'
            }}
          />
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant={isMobile ? 'fullWidth' : 'standard'}
            centered={!isMobile}
          >
            <Tab label="All" />
            <Tab label="Active" />
            <Tab label="Completed" />
          </Tabs>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Error loading todos: {error.message}
        </Alert>
      )}

      <TabPanel value={tabValue} index={0}>
        {renderTodoList(allTodos)}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {renderTodoList(activeTodos)}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {renderTodoList(completedTodos)}
      </TabPanel>
    </StyledContainer>
  );
};

export default TodoList;