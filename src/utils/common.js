export default function handleStopPropagation(e) {
  const event = e || window.event;
  event.cancelBubble = true;
  if (event.stopPropagation) {
    event.stopPropagation();
  }
}
