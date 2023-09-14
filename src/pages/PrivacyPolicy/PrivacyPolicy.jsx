import React, { useState } from 'react'
import CMS from '../CMS/CMS'
import {useForm} from 'react-hook-form'
import requestApi from '../../utils/request'
import { useMutation, useQuery } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import { Button, Form } from 'react-bootstrap'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ckeditor, { CKEditor } from '@ckeditor/ckeditor5-react'
const PrivacyPolicy = () => {

  const {
    handleSubmit,
    formState: { errors },
} = useForm({})

const [currentCmsId, setCurrentCmsId] = useState()
const [ckeditordata, setckeditordata] = useState('')
function handleCKEditor(event, editor) {
    const data = editor.getData()
    setckeditordata(data)
}
async function getTermsandcondition() {
    return requestApi.post(
        `/cms/view`,
        {slug: 'privacy-policy'},
        {},
        { headers: true }
    ).then((res) => {
        setCurrentCmsId(res?.data?.data?.cmsId)
        setckeditordata(res?.data?.data?.description)
        return res.data.data
    })
}
const { data, isLoading } = useQuery({
    queryKey: ['CMSlist'],
    queryFn: getTermsandcondition
})




async function addEditPolicy(payload) {
    return requestApi.post(
        `/cms/edit`,
        { ...payload, cmsId: currentCmsId},
        // { slug: 'privacy-policy' },
        { headers: true }
    )
}

const editMutation = useMutation(addEditPolicy, {
    onSuccess: (res) => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '',
            text: res?.data?.meta?.message
        })
    },
    onError: (error) => {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: '',
            text: error?.message
        })
    }
})
const onEditSubmit = (data) => {
    const payload = {
        description: ckeditordata
    }
    editMutation.mutate(payload)
}

  return (
      <CMS>
        <div className='head'>
            <h2>Privacy Policy</h2>
        </div>
        <div className='support-body-content'>
            <Form onSubmit={handleSubmit(onEditSubmit)}>
                <div className='form-group'>
                    <CKEditor
                        data={
                            ckeditordata
                                ? ckeditordata
                                : ""
                            
                        }
                        editor={ClassicEditor}
                        config={{
                            removePlugins: [
                                'EasyImage',
                                'ImageUpload',
                                'MediaEmbed'
                            ],
                            allowedContent: true,
                            extraAllowedContent: true,
                            toolbar: [
                                'heading',
                                '|',
                                'bold',
                                'italic',
                                'link',
                                'bulletedList',
                                'numberedList',
                                // "blockQuote",
                                // 'ckfinder',
                                '|',
                                // 'imageTextAlternative',
                                // 'imageUpload',
                                // 'imageStyle:full',
                                // 'imageStyle:side',
                                // '|',
                                // 'mediaEmbed',
                                'insertTable',
                                // "tableColumn",
                                // "tableRow",
                                // "mergeTableCells",
                                '|',
                                'undo',
                                'redo'
                            ]
                        }}
                        onReady={(editor) =>
                            // ckeditordata.description
                            console.log(editor, 'hello')
                        }
                        onChange={handleCKEditor}
                    />
                </div>
                <button type="submit" className='solid-red-btn'>Save</button>
            </Form>
        </div>
      </CMS>
  )
}

export default PrivacyPolicy