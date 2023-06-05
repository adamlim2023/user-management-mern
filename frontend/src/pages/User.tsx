import React, { FC, useState } from 'react';
import Button from 'components/Button';
import DataTable from 'components/DataTable';
import Modal from 'components/Modal';
import Select from 'components/Select';
import TextField from 'components/TextField';

interface formProps {
  name: string;
  email: string;
  gender: string;
  birthday: string;
}

interface optionProps {
  id: string | number;
  label: string;
}

interface UserProps {
  id: number | string;
  name: string;
  email: string;
  gender: string;
  birthday: string;
}

const User: FC = () => {
  const cols: string[] = ['No', 'Name', 'Email', 'Gender', 'Birthday', 'Action'];
  const [rows, setRows] = useState<UserProps[]>([
    {
      id: 1,
      name: "Full Name 1",
      email: 'Email 1',
      gender: "Male",
      birthday: "2000-02-12"
    },
    {
      id: 2,
      name: "Full Name 2",
      email: 'Email 2',
      gender: "Male",
      birthday: "2000-02-12"
    },
    {
      id: 3,
      name: "Full Name 3",
      email: 'Email 3',
      gender: "Male",
      birthday: "2000-02-12"
    },
  ]);

  const [selectedRowId, setSelectedRowId] = useState<any>(null);
  const [form, setForm] = useState<formProps>({
    name: "",
    email: "",
    gender: "",
    birthday: ""
  });
  const genderOptions: optionProps[] = [
    {
      id: 'male',
      label: "Male"
    },
    {
      id: 'female',
      label: "Female"
    },
  ];
  const [isOpenFormModal, setIsOpenFormModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const handleToggleOpenFormModal = () => setIsOpenFormModal(!isOpenFormModal);
  const handleToggleOpenDeleteModal = () => setIsOpenDeleteModal(!isOpenDeleteModal);
  const handleChangeFormInfo = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSave = () => {
    const clonedRows = [...rows];
    let index: number = 0;
    if (!selectedRowId) {
      clonedRows.push({
        id: Math.random(),
        ...form
      });
    } else {
      clonedRows.map((row: UserProps, i: number) => {
        if (row.id === selectedRowId) {
          index = i
        }
      });
      clonedRows.splice(index, 1, { ...clonedRows[index], ...form });
    }
    setRows([...clonedRows]);
    handleCancel();
  }

  const handleCancel = () => {
    setSelectedRowId(null);
    setForm({
      name: "",
      email: "",
      gender: "",
      birthday: ""
    });
    handleToggleOpenFormModal();
  }

  const handleUpdate = (id: any) => {
    setSelectedRowId(id);
    handleToggleOpenFormModal();
  }

  const handleDelete = () => {
    let index: number = 0;
    const clonedRows = [...rows];
    clonedRows.map((row: UserProps, i: number) => {
      if (row.id === selectedRowId) {
        index = i
      }
    });
    clonedRows.splice(index, 1);
    setRows([...clonedRows]);
    handleToggleOpenDeleteModal();
  }

  const renderRow = (row: any, i: number) => {
    return <tr>
      <td className='text-center'>{i + 1}</td>
      <td className='text-center'>{row.name}</td>
      <td className='text-center'>{row.email}</td>
      <td className='text-center'>{row.gender}</td>
      <td className='text-center'>{row.birthday}</td>
      <td className='w-40'>
        <div className='flex justify-center gap-1'>
          <Button size="sm" onClick={() => handleUpdate(row.id)}>
            Update
          </Button>
          <Button
            size="sm"
            color="danger"
            onClick={() => {
              setIsOpenDeleteModal(true);
              setSelectedRowId(row.id)
            }}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  }

  return <div>
    <div className='flex justify-end mb-5'>
      <Button onClick={handleToggleOpenFormModal}>Create</Button>
    </div>
    <DataTable
      cols={cols}
      rows={rows}
      renderRow={renderRow}
    />
    <Modal
      opened={isOpenFormModal}
      onClose={handleCancel}
      title={selectedRowId ? 'Edit user' : 'Create user'}
    >
      <div className='p-5 grid grid-cols-2 gap-5 border-b border-b-gray-100'>
        <TextField
          label='Name'
          placeholder='Enter full name'
          value={form.name}
          name="name"
          onChange={handleChangeFormInfo}
        />
        <TextField
          label='Email'
          placeholder='Enter email'
          value={form.email}
          name="email"
          onChange={handleChangeFormInfo}
        />
        <Select
          label='Gender'
          placeholder='Select gender'
          value={form.gender}
          name="gender"
          onChange={handleChangeFormInfo}
          options={genderOptions}
        />
        <TextField
          type="date"
          label='Birthday'
          placeholder='Enter birthday'
          value={form.birthday}
          name="birthday"
          onChange={handleChangeFormInfo}
        />
      </div>
      <div className='flex justify-end gap-3 p-5'>
        <Button color="light" onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </Modal>
    <Modal
      opened={isOpenDeleteModal}
      onClose={handleToggleOpenDeleteModal}
      title="Delete user"
    >
      <div className='p-5 grid grid-cols-2 gap-5 border-b border-b-gray-100'>
        Are you sure want to delete?
      </div>
      <div className='flex justify-end gap-3 p-5'>
        <Button color="light" onClick={handleToggleOpenDeleteModal}>Cancel</Button>
        <Button color="danger" onClick={handleDelete}>Delete</Button>
      </div>
    </Modal>
  </div>
}

export default User;