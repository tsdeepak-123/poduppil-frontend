import React from 'react'
import ReturnButton from '../../CommonComponents/Return/ReturnButton'
import PasswordChangeModal from './PasswordChangeModal'
import Notifications from './Notifications'

function AdminAccount() {
  return (
    <>
    <ReturnButton/>
    <div className='flex justify-end me-14 mt-6'>
        <PasswordChangeModal/>
      </div>
    <div>
      <Notifications/>
    </div>

    </>
  )
}

export default AdminAccount
