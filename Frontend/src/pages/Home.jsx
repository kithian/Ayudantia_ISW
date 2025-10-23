import { useState } from 'react';
import { getProfile, updateProfile, deleteProfile } from '../services/profile.service.js';

const Home = () => {
  const [profileData, setProfileData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [emailEdit, setEmailEdit] = useState('');
  const [passwordEdit, setPasswordEdit] = useState('');


  const handleGetProfile = async () => {
    try {
      const response = await getProfile();
      console.log('getProfile response:', response);
      if (response && response.status === 'Success') {
        setProfileData(response.data);
        alert('Perfil obtenido con éxito. Revisa los datos debajo del botón.');
      } else {
        alert(response.message || 'Error al obtener perfil');
      }
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
      alert('Error al obtener el perfil. Revisa la consola para más detalles.');
    }
  };

   const submitEdit = async (e) => {
  e.preventDefault();
  try {
    const payload = {};
    if (emailEdit) payload.email = emailEdit;
    if (passwordEdit) payload.password = passwordEdit;
    const res = await updateProfile(payload);
    if (res && res.status === 'Success') {
      alert(res.message || 'Perfil modificado correctamente');
      setEditing(false);
      await handleGetProfile();
    } else {
      alert(res.message || 'No se ha modificado el perfil');
    }
  } catch (error) {
    alert('Error al modificar perfil');
  }
};
 
  const openEdit = () => {
    if (!profileData) return alert('Primero obtén el perfil');
    setEmailEdit(profileData.userData?.email || '');
    setPasswordEdit('');
    setEditing(true);
  };

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro que deseas eliminar tu perfil? Esta acción es irreversible.')) return;
    const result = await deleteProfile();
    if (result && result.status === 'Success') {
      alert('Perfil eliminado. Serás redirigido a login.');
      Cookies.remove('jwt-auth');
      window.location.href = '/login';
    } else {
      alert(result.message || 'Error al eliminar perfil');
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-2xl transform transition-all hover:scale-105">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Página de Inicio
        </h1>
        
        <button 
          onClick={handleGetProfile} 
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
        >
          Obtener Perfil
        </button>

        {profileData && (
          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
            <pre className="text-sm text-gray-700 overflow-auto">{JSON.stringify(profileData, null, 2)}</pre>
            <div className="mt-4 flex gap-3">
              <button onClick={openEdit} className="bg-yellow-400 text-white px-4 py-2 rounded">Editar perfil</button>
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Eliminar perfil</button>
            </div>
            {editing && (
              <form onSubmit={submitEdit} className="mt-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" value={emailEdit} onChange={(e) => setEmailEdit(e.target.value)} className="w-full border px-3 py-2 rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nueva contraseña</label>
                  <input type="password" value={passwordEdit} onChange={(e) => setPasswordEdit(e.target.value)} pattern="^[a-zA-Z0-9.@]+$" title="Solo letras, números, puntos y arrobas" className="w-full border px-3 py-2 rounded" />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Guardar</button>
                  <button type="button" onClick={() => setEditing(false)} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
