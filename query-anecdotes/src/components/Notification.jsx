import useAnecdotesContext from "../hooks/useAnecdotesContext"

const Notification = () => {
  const { notification } = useAnecdotesContext()

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <>
      {notification &&
        <div data-testid="notification" style={style}>
          {notification}
        </div>
      }
    </>
  )
}

export default Notification
