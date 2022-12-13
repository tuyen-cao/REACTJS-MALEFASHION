import { request } from '../utilities/axios-utils'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useQuery, useQueryClient } from 'react-query'
import { addPromo } from '../reducers/paymentReducer';
import { PromoCodeFormValues, PromoCodeProps } from 'models/types';


const PromoCode = (props: PromoCodeProps) => {
    const { hasRef = false } = props
    const fetchPromocodes = (promocode: string) => {
        return request({ url: `/promoCodes?code=${promocode}` })
    }

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm<PromoCodeFormValues>();
    const promoCodeRef = useRef<HTMLInputElement | null>(null);
    const { ref, ...rest } = register('promocode');
    const [promocode, setPromocode] = useState("");

    const dispatch = useDispatch();
    const queryClient = useQueryClient()

    const { isLoading, data: promo, isError, error } = useQuery(
        ['promocode', promocode],
        () => fetchPromocodes(promocode),
        {
            enabled: Boolean(promocode),
            initialData: () => {
                const promoCode = queryClient
                    .getQueriesData('promocode')
                    ?.find((promo: any) => promo.code === promocode)
                if (promoCode) return promoCode
                else return undefined
            }
        }
    )
    const onSubmit: SubmitHandler<PromoCodeFormValues> = (data) => {
        setPromocode(data.promocode)

    };
    const addPromoFnc = useCallback(() => {
        if (!isLoading) {
            dispatch(addPromo(Number(promo?.data[0].value)))
        }
    }, [isLoading])
    useEffect(() => {
        if (promo?.data?.length > 0) addPromoFnc()
        register("promocode",
            {
                required: "This field is required",
                maxLength: { value: 5, message: "Please enter no more than 5 characters." }
            })
    }, [isLoading, promo])

    return (
        <>
            <div className={'was-validated cart__discount'}>
                <h6>Discount codes</h6>
                <form name="frmPromo" onSubmit={handleSubmit(onSubmit)}>
                    {hasRef
                        ? <input type="text" placeholder="Coupon code"
                            {...rest}
                            ref={(e) => {
                                ref(e)
                                promoCodeRef.current = e // you can still assign to ref
                                promoCodeRef.current?.focus()
                            }} />
                        : <input type="text" placeholder="Coupon code"  {...register("promocode")} />}

                    <button type='submit'  >Apply</button>
                </form>

                {!isLoading
                    ? promo?.data?.length === 0 ?
                        <strong className="invalid-feedback">Coupon code is not valid</strong>
                        : <>
                            <strong>{promo?.data[0].value}</strong>
                            {errors.promocode?.type && <div className="invalid-feedback">{errors.promocode.message}</div>}
                            {isError && <div className="invalid-feedback">{isError}</div>}
                        </>
                    : null}
            </div>
        </>
    )
}
export default React.memo(PromoCode)

