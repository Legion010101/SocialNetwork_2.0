import {Formik, Field, Form} from 'formik'
import React, {FC, useEffect, useState} from 'react'
import {FieldHelper} from '../../../utility/FieldHelper'
import {connect} from 'react-redux'
import {
  getProfileUser,
  updateProfile,
  updateProfileSuccessful,
} from '../../../redux/profileReducer'
import {compose} from 'redux'
import {validateRequired} from '../../../utility/validate'
import {profileType} from '../../../types/types'
import {AppStateType} from '../../../redux/reduxStore'
import style from './Setting.module.css'
import {CheckOutlined, StopOutlined} from '@ant-design/icons'

const Setting: FC<PropsType> = (props) => {
  useEffect(() => {
    if (!props.profile && props.userId && props.getProfileUser) {
      props.getProfileUser(props.userId)
    }
  }, [props.profile])
  return (
    <div className={style.settingContainer}>
      <h1>Setting profile</h1>
      {props.profile && (
        <SettingForm
          profile={props.profile}
          updateProfile={props.updateProfile}
          userId={props.userId}
          successful={props.successful}
          updateProfileSuccessful={props.updateProfileSuccessful}
        />
      )}
    </div>
  )
}

const SettingForm: FC<PropsType> = ({profile, updateProfile, userId}) => {
  const [checkForChanges, setCheckForChanges] = useState(false)
  const validateFullName = validateRequired(4)
  const validateLookingForAJobDescription = validateRequired(10)
  const onSubmit = (
    values: profileType,
    {
      setSubmitting,
      setStatus,
    }: {setSubmitting: (boolean: boolean) => void; setStatus: () => void},
  ) => {
    updateProfile(values, setStatus)

    setSubmitting(false)
    setCheckForChanges(true)
  }
  type SettingFormPropsKey = Extract<keyof profileType, string>
  let contactsProps = profile?.contacts
  let initialValues = {
    userId: userId,
    fullName: profile?.fullName,
    lookingForAJobDescription: profile?.lookingForAJobDescription,

    lookingForAJob: profile ? profile.lookingForAJob || false : false,
    contacts: {
      github: contactsProps ? contactsProps.github || null : null,
      vk: contactsProps ? contactsProps.vk || null : null,
      facebook: contactsProps ? contactsProps.facebook || null : null,
      instagram: contactsProps ? contactsProps.instagram || null : null,
      twitter: contactsProps ? contactsProps.twitter || null : null,
      website: contactsProps ? contactsProps.website || null : null,
      youtube: contactsProps ? contactsProps.youtube || null : null,
      mainLink: contactsProps ? contactsProps.mainLink || null : null,
    },
  }

  return (
    <Formik initialValues={initialValues} validateOnBlur onSubmit={onSubmit}>
      {({values, errors, touched, status}) => (
        <Form>
          {checkForChanges && !status && (
            <div className={style.successful}>
              changes saved successfully &nbsp; <CheckOutlined />
            </div>
          )}
          {!!status && (
            <div className={style.error}>
              {status} &nbsp; <StopOutlined />
            </div>
          )}
          <div>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </div>
          <div className={style.fullName}>
            {FieldHelper<SettingFormPropsKey>(
              'text',
              'fullName',
              values.fullName,
              'Full name',
              '',
              validateFullName,
            )}
            {errors.fullName && touched.fullName && (
              <div className="errors">{errors.fullName}</div>
            )}
          </div>
          <div className={style.lookingForAJobDescription}>
            {FieldHelper<SettingFormPropsKey>(
              'textarea',
              'lookingForAJobDescription',
              values.lookingForAJobDescription,
              'Tell about work for you',
              '',
              validateLookingForAJobDescription,
            )}
            {errors.lookingForAJobDescription &&
              touched.lookingForAJobDescription && (
                <div className="errors">{errors.lookingForAJobDescription}</div>
              )}
          </div>
          <div className={style.lookingForAJob}>
            <div>looking for a job</div>
            <div>
              <Field type="checkbox" name="lookingForAJob" />
            </div>
          </div>
          <div className={style.contacts}>
            <h4>Contacts:</h4>
            {profile && (
              <div>
                {Object.keys(profile.contacts || []).map((contact, index) => {
                  const name = contact
                  const value =
                    values.contacts &&
                    values.contacts[name as keyof typeof values.contacts]
                  const error = errors[name as keyof typeof errors]
                  return (
                    <div className={style.contact} key={name}>
                      {FieldHelper('text', `contacts.${name}`, value, name)}
                      <hr />
                      {error && <div className="errors">{error}</div>}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  )
}

type MapStateToPropsType = {
  profile: profileType | null | undefined
  userId: number | null
  successful: boolean
}
type MapDispatchToPropsType = {
  updateProfile: (profileData: profileType, setStatus: Function) => void
  getProfileUser?: (userId: number) => void
  updateProfileSuccessful: (boolean: boolean) => void
}
type OwnStateType = {}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnStateType

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    profile: state.profilePage.profile,
    userId: state.authReducer.dataUser.id,
    successful: state.profilePage.updateProfileSuccessful,
  }
}

const SettingContainer = compose(
  connect<
    MapStateToPropsType,
    MapDispatchToPropsType,
    OwnStateType,
    AppStateType
  >(mapStateToProps, {
    updateProfile,
    getProfileUser,
    updateProfileSuccessful,
  }),
  // AuthNavigate,
)(Setting)

export default SettingContainer
