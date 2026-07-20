import React, { useEffect, useState } from 'react'
import CartContent from '../../components/payment/leftside/CartContent'
import PriceRow from '../../components/payment/leftside/PriceRow'
import Product from '../../components/payment/leftside/Product'
import TitleCard from '../../components/payment/leftside/TitleCard'
import Step from '../../components/payment/Step'
import SignUp from '../../components/signup/SignUp'
import AddLocation from '../../components/payment/AddLocation'
import Title from '../../components/payment/payment_step/Title'
import PaymentTypeTitle from '../../components/payment/payment_step/PaymentTypeTitle'
import BankTransfer from '../../components/payment/payment_step/BankTransfer'
import DebitCard from '../../components/payment/payment_step/DebitCard'
import PayByPoints from '../../components/payment/payment_step/PayByPoints'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Link from 'next/link'
import DiscountVoucher from '../../components/payment/leftside/DiscountVoucher'
import {
  addCoupon,
  clearCart,
  clearCoupon,
  clearUsedCoupon,
} from '../../redux/cartSlice'
import { clearMessage, setMessage } from '../../redux/message'
import { clearOrder, createOrder } from '../../redux/auth'

export default function Checkout() {
  const router = useRouter()
  const [isLoginSelected, setIsLoginSelected] = useState(true)
  const [paymentType, setPaymentType] = useState('D')
  const a = isLoginSelected

  const { order } = useSelector((state) => state.auth)
  const {
    cart,
    discount,
    couponValue,
    coupons,
    total,
    usedCoupon,
  } = useSelector((state) => state.cart)
  //
  const dispatch = useDispatch()

  // useEffect(()=>{
  //   dispatch(createOrder({...order,
  //   total:parseInt(total+order?.shipping_cost)
  //   }))
  // },[])

  const handleChange = (event) => {
    setPaymentType(event.target.value)
  }
  const [vat, setVat] = useState('')
  const getVat = async (e) => {
    await axios
      .get('https://api.sedihisham.com/settings/findall')
      .then((res) => {
        res.data?.vat ? setVat(res.data?.vat) : setVat(0)
        // console.log("Vat :"+JSON.stringify(res.data.vat))
      })
  }
  //
  useEffect(() => {
    getVat()
  }, [])

  const { message } = useSelector((state) => state.message)
  useEffect(() => {
    dispatch(clearMessage())
  }, [dispatch])

  //    useEffect(()=>{
  //      dispatch(
  //       createOrder({
  //        ...order,
  //         total: vat !== 0 ? (order?.total+order?.shipping_cost -couponValue[couponValue?.length-1] + ((order.total)*vat)/100) : (order.total+order.shipping_cost-couponValue[couponValue?.length-1]),
  //         used_coupon:coupons[coupons?.length-1],
  //       }))
  // },[couponValue[couponValue?.length-1]])

  // const changeTotalWithCoupon = () =>{

  // }

  // console.log("vendredi "+couponValue[0])

  const [orderId, setOrderId] = useState(0)
  const submitOrder = async (e) => {
    if (cart?.length === 0) {
      dispatch(setMessage('You cart is empty or you order is already sent'))
    } else {
      await axios
        .post('https://api.sedihisham.com/orders/create', {
          payment_method:
            paymentType === 'D'
              ? 'cash_on_delivery'
              : paymentType === 'P'
              ? 'points'
              : 'bank_transfer',
          customer_id: order.customer_id,
          phone_number_recipent: order.phone_number_recipent,
          request_recipent_name: order.request_recipent_name,
          customer_comment: order.customer_comment,
          used_coupon: usedCoupon,
          shipping_addres: order.shipping_addres,
          subtotal: order.subtotal,
          shipping_cost: order.shipping_cost,
          discount: order.discount + couponValue[couponValue?.length - 1],
          vat: order.vat,
          order_items: cart,
          total:
            vat !== 0
              ? order?.total +
                order?.shipping_cost -
                couponValue[0] +
                (order.total * vat) / 100
              : order.total + order.shipping_cost - couponValue[0],
          reward_points:
            order.reward_points !== null ||
            order.reward_points !== '' ||
            order.reward_points !== 0
              ? order.reward_points
              : 0,
        })
        .then((response) => {
          setOrderId(response.data?.id)
          //Aadd used coupon to cpipns hrer
          dispatch(addCoupon(usedCoupon))
          router.push('/payment/orderSent/' + response.data?.id)
          dispatch(clearCart())
          dispatch(clearOrder())
          dispatch(clearCouponValue())
        })
        .catch((error) => {
          dispatch(
            setMessage(
              error.response &&
                error.response.data &&
                error.response.data.message,
            ) ||
              error.message ||
              error.toString(),
          )
        })
    }
  }
  // console.log(order.total)

  useEffect(() => {
    a === isLoginSelected
  }, [isLoginSelected])
  //  console.log(paymentType)

  useEffect(() => {
    dispatch(clearCoupon())
    dispatch(clearUsedCoupon())
  }, [])

  const { local } = useSelector((state) => state.language)
  return (
    <div className="md:mx-32 mt-20 mb-20  flex flex-col ">
      {local === 'ar' ? (
        <div className="mt-10 flex   justify-center items-center">
          <Step title="الدفع" color="red-500" opacity={90} number="3" />
          <div className="border-[1px] w-28 mt-5  bg-red-500 border-gray-600 opacity-30 border-dashed w-" />
          <Step title="العنوان" color="red-500" opacity={60} number="2" />{' '}
          <div className="border-[1px]  h-[1px] mt-5 w-28 bg-red-700 border-gray-600 opacity-30 border-dashed " />
          <Step title="الحساب" color="red-500" opacity={60} number="1" />
        </div>
      ) : (
        <div className="mt-10 flex   justify-center items-center">
          <Step title="Account" color="red-500" opacity={60} number="1" />
          <div className="border-[1px] w-28 mt-5  bg-red-500 border-red-600 opacity-30 border-dashed w-" />
          <Step title="Address" color="red-500" opacity={60} number="2" />{' '}
          <div className="border-[1px]  h-[1px] mt-5 w-28 bg-red-500 border-red-600 opacity-30 border-dashed " />
          <Step title="Pay" color="red-500" opacity={90} number="3" />
        </div>
      )}
      <div className="flex mt-6 flex-col md:flex-row">
        <div className="md:flex-[40%]  flex flex-col ">
          <CartContent />
          <DiscountVoucher />
        </div>

        <div className="md:flex-[60%] mt-4 md:mt-0 space-y-5 ">
          <div>
            {' '}
            <Title />
            <PaymentTypeTitle
              handleChange={handleChange}
              checked={paymentType === 'D'}
              label={local === 'ar' ? 'الدفع عند التسليم' : 'Cash on delivery'}
              name="D"
              value="D"
            />
            <PaymentTypeTitle
              handleChange={handleChange}
              checked={paymentType === 'T'}
              label={local === 'ar' ? 'تحويل بنكي' : 'Bank Transfer'}
              name="T"
              value="T"
            />
            {paymentType === 'T' ? <BankTransfer /> : <div></div>}
            {/* <PaymentTypeTitle
              handleChange={handleChange}
              checked={paymentType === "I"}
              label="ادفع باقة بنك(فيزا او ماستر كارد)"
              name="I"
              value="I"
            /> */}
            {/* {paymentType === "I" ? <DebitCard /> : <div></div>} */}
            <PaymentTypeTitle
              handleChange={handleChange}
              checked={paymentType === 'P'}
              label="الدفع عن طريق النقاط"
              name="P"
              value="P"
            />
            {paymentType === 'P' ? <PayByPoints /> : <div></div>}
            {message && (
              <div
                className="text-red-600 my-2 flex justify-center items-center"
                role="alert"
              >
                {message}
              </div>
            )}
            <div className="mt-6 w-[60%] mx-[20%]">
              <button
                onClick={() => submitOrder()}
                className=" w-full flex justify-center items-center  rounded-full  px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#007530]  hover:bg-green-600 "
              >
                {local === 'ar' ? ' تاكيد الطلب' : 'Submit order'}
              </button>{' '}
            </div>
          </div>
        </div>
      </div>{' '}
    </div>
  )
}
