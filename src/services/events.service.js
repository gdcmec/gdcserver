const addNewEvent = async (event) => {

    const newEvent = new Event({
        id: event.id,
        title: event.title,
        description: event.description,
        date: event.date,
        regestationLink: event.regestationLink
    });

    await newEvent.save();

}

const editEvent = async (event) => {}

const deleteEvent = async (event) => {}

module.exports = { addNewEvent, editEvent, deleteEvent }
