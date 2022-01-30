import React from 'react'
import Button from "components/Button.jsx"

export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">Are you sure you want to delete?</h1>
      <section className="appointment__actions">
        <Button
          danger
          onClick={props.onCancel}
        >Cancel</Button>

        <Button
          danger
          onClick={() => props.onConfirm(props.id)}
        >Confirm</Button>

      </section>
    </main>
  )
}