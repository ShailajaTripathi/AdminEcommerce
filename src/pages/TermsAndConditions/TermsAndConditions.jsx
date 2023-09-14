import React, { useState } from 'react'
import CMS from '../CMS/CMS'
import { useForm } from 'react-hook-form'
import requestApi from '../../utils/request'
import { useMutation, useQuery } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import { Button, Form } from 'react-bootstrap'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ckeditor, { CKEditor } from '@ckeditor/ckeditor5-react'
const TermsAndConditions = () => {
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

    //#region Get CMS by SLUG
    async function getTermsandcondition() {
        return requestApi
            .post(`/cms/view`, {slug: 'terms-and-conditions'}, {}, true)
            .then((res) => {
                setCurrentCmsId(res?.data?.data?.cmsId)
                setckeditordata(res?.data?.data?.description)
                return res.data.data
                // console.log(res.data.data);
            })
    }
    const { data, isLoading } = useQuery({
        queryKey: ['CMSlist'],
        queryFn: getTermsandcondition
    })
    const [editorState, seteditorState] = useState()
    async function addEditTermsandConditions(payload) {
        return requestApi.post(
            `/cms/edit`,
            { ...payload, 
                // slug: 'terms-and-conditions',
                cmsId:currentCmsId},
           {},
            true
        )
    }   
    //#endregion

    //#region  AddEdit CMS by SLUG
    const editMutation = useMutation(addEditTermsandConditions, {
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
    //#endregion

    const onEditSubmit = (data) => {
        const payload = {
            description: ckeditordata
        }
        editMutation.mutate(payload)
    }

    console.log(ckeditordata,"ckeditordata");

    return (
        <CMS>
            <div className='head'>
                <h2>Terms & Conditions</h2>
            </div>
            <div className='support-body-content'>
                <Form onSubmit={handleSubmit(onEditSubmit)}>
                    <div div className='form-group'>
                        <CKEditor
                            data={
                                ckeditordata
                                    ? ckeditordata
                                    :""
                                
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

export default TermsAndConditions
