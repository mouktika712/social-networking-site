import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useState } from 'react';

const Settings = () => {
  const auth = useAuth();
  const [name, setName] = useState(auth.user?.name);
  const [editMode, setEditMode] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingForm, setSavingFrom] = useState(false);

  const updateProfile = () => {};

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>

      {editMode && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </>
      )}

      {/* Edit-Mode = false:
      Email Name Edit-Profile-Button (w/o any input fields are visible).
      Edit-Mode = true:
      Email(w/o input field) & Name,password,confirm-password (with input fields are visible) with save-profile & go-back-buttons.
      on clicking edit-profile: editMode will be set to true & on clicking go-back it will be set to false.*/}
      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
              disabled={savingForm}
            >
              {savingForm ? 'Saving Changes...' : 'Save Profile'}
            </button>
            <button
              className={`button ${styles.editBtn}`}
              onClick={() => {
                setEditMode(false);
              }}
            >
              Go Back
            </button>
          </>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={() => {
              setEditMode(true);
            }}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
