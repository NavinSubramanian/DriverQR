import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbar,
} from '@mui/x-data-grid';
import { Container } from '@mui/material';
import Footer from './components/Footer';
import { Link } from 'react-router-dom';

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [page, setPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(0); // Total pages state
  const [pageSize, setPageSize] = React.useState(50);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://driver-qr.vercel.app/users?page=${page}&limit=100`);
        const { users, totalPages } = response.data;

        const transformedUsers = users
          .filter(user => user.userDetails && user.userDetails.personName)
          .map((user, index) => ({
            ...user.userDetails,
            // id: index + 1 + (page - 1) * 10, 
            id: index + 1, 
            _id: user._id,
          }));

        setRows(transformedUsers);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [page]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (userDetails) => {
    const updatedRow = { ...userDetails, isNew: false };
    setRows(rows.map((row) => (row.id === userDetails.id ? updatedRow : row)));
    try {
      const response = await axios.put(`https://driver-qr.vercel.app/users/${userDetails._id}`, { userDetails });
      return updatedRow;
    } catch (error) {
      console.error('Error updating user:', error);
      return updatedRow;
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'personName',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      width: 80,
      editable: true,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 80,
      editable: true,
      sortable: false,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      type: 'number',
      width: 130,
      editable: true,
      sortable: false,
    },
    {
      field: 'emergencyNumber',
      headerName: 'Emergency Number',
      sortable: false,
      editable: true,
      width: 160,
    },
    {
      field: 'bloodGroup',
      headerName: 'Blood Group',
      sortable: false,
      editable: true,
      width: 120,
    },
    {
      field: 'address',
      headerName: 'Address',
      sortable: false,
      editable: true,
      width: 300,
    },
    {
      field: 'disease',
      headerName: 'Disease',
      sortable: false,
      editable: true,
      width: 110,
    },
    {
      field: 'allergies',
      headerName: 'Allergies',
      sortable: false,
      editable: true,
      width: 110,
    },
    {
      field: 'regularHospital',
      headerName: 'Regular Hospital',
      sortable: false,
      editable: true,
      width: 170,
    },
    {
      field: 'doctor',
      headerName: 'Doctor',
      sortable: false,
      editable: true,
      width: 100,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{ color: 'primary.main' }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  // Pagination control functions
  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1)); // Prevent going below page 1
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages)); // Prevent going above total pages
  };

  return (
    <>
      <nav style={{ padding: '20px', backgroundColor: 'black' }}>
        <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
          <button
            style={{
              padding: '7px 18px',
              fontWeight: '500',
              backgroundColor: '#FFDD00',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Back
          </button>
        </Link>
      </nav>
      <div style={{ marginBottom: '50px', padding: '20px' }}>
        <Box
          sx={{
            height: 700,
            width: '100%',
            '& .actions': {
              color: 'text.secondary',
            },
            '& .textPrimary': {
              color: 'text.primary',
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
              toolbar: GridToolbar,
            }}
            slotProps={{
              toolbar: {
                setRows,
                setRowModesModel,
                showQuickFilter: true,
              },
            }}
          />
        </Box>

        {/* Pagination Buttons */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Button onClick={handlePreviousPage} disabled={page <= 1}>
            Previous Page
          </Button>
          <Button onClick={handleNextPage} disabled={page >= totalPages}>
            Next Page
          </Button>
        </div>
      </div>

      <Footer />
    </>
  );
}
