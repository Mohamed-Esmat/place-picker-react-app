# 📍 Place Picker – React Side Effects Exploration

Welcome to the **Place Picker** project! 🎓 This is a hands-on mini project built as part of **Maximilian Schwarzmüller's** Udemy course: [*React - The Complete Guide (incl. Hooks, React Router, Redux)*](https://www.udemy.com/course/react-the-complete-guide-incl-redux/).

It’s a deep dive into **side effects in React** using the `useEffect` hook, complete with practical examples that explain when and how to use it — or when not to! 💡 Whether you're managing timers ⏱️, accessing the browser’s geolocation API 🌍, or syncing data with `localStorage` 💾, this project is here to train your muscle memory with real use cases!

---

## 🔗 Live Demo

You can try the app live here: [place-picker-react-app-esmat.vercel.app](https://place-picker-react-app-esmat.vercel.app/)

---

## 📘 Topics Covered

This project is broken into bite-sized lessons:

1. 🔍 What’s a Side Effect?
2. ♻️ A Potential Problem: Infinite Loops
3. ⚙️ Using `useEffect` for Side Effects
4. 🚫 When Not to Use `useEffect`
5. 🧠 Another Example of When It’s Not Needed
6. 🌐 Preparing for Browser API Integration
7. 📡 Syncing with Browser APIs (Geolocation)
8. 🧩 Understanding Dependencies in `useEffect`
9. 🛠 Fixing Problems with useEffect
10. 🧼 Cleanup Functions in useEffect
11. ❗ The Problem with Object & Function Dependencies
12. 🔁 Introducing `useCallback`
13. 🧽 Cleanup Functions – Another Example
14. 🚀 Optimizing State Updates

---

## 1️⃣ What’s a Side Effect?

A **side effect** in React is anything that happens *outside the component’s rendering cycle*.

Examples:
- 📡 Fetching data
- 🌍 Reading browser geolocation
- 💾 Reading/writing `localStorage`
- ⏱ Setting timeouts/intervals
- 🧱 Direct DOM manipulations

---

## 2️⃣ Infinite Loops with Side Effects 🔁

Bad Example:
```jsx
useEffect(() => {
  setCount(count + 1); // 🔄 Causes infinite loop!
});
```

✅ Fix with dependencies:
```jsx
useEffect(() => {
  setCount(count + 1);
}, [count]);
```

Always specify a **dependency array** to prevent continuous re-renders! 🛑

---

## 3️⃣ Handling Side Effects with `useEffect()` ⚙️

```jsx
useEffect(() => {
  console.log('Effect executed');
}, [someDependency]);
```

This ensures the effect runs **only when needed**, based on dependencies. 🧠

---

## 4️⃣ Not All State Requires Effects ❌

```jsx
const isValid = inputValue.trim().length > 0; // ✅ Direct logic
```

📌 No need for `useEffect` when deriving values from state directly.

---

## 5️⃣ Another Example Where `useEffect` Isn’t Needed

```jsx
{isLoading && <Spinner />}
```

Conditional rendering works just fine without effects. 🧩

---

## 6️⃣ Preparing for Browser API Integration 🌐

Let’s say we need the user’s location:
```jsx
useEffect(() => {
  navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}, []);
```

🛰 This is the perfect time to use `useEffect` — triggered once when the component mounts.

---

## 7️⃣ Syncing with Browser APIs (localStorage) 💾

**Load data on mount:**
```jsx
useEffect(() => {
  const data = localStorage.getItem('places');
  if (data) setPlaces(JSON.parse(data));
}, []);
```

**Save data when places change:**
```jsx
useEffect(() => {
  localStorage.setItem('places', JSON.stringify(places));
}, [places]);
```

---

## 8️⃣ Dependency Arrays Matter! 🧩

```jsx
useEffect(() => {
  fetchData(userId);
}, [userId]);
```

❗ Missing dependencies can lead to stale values and unexpected bugs.

---

## 9️⃣ Fixing Real Problems with useEffect 🛠

```jsx
useEffect(() => {
  if (selectedPlaceId) {
    fetchDetails(selectedPlaceId);
  }
}, [selectedPlaceId]);
```

🎯 Automatically triggers data fetching when the selected ID changes.

---

## 🔟 Cleanup Functions in useEffect 🧼

```jsx
useEffect(() => {
  const timer = setTimeout(() => setVisible(true), 2000);

  return () => clearTimeout(timer); // ✅ Clean it up!
}, []);
```

Always clean up timers or event listeners to prevent memory leaks. 🧠

---

## 1️⃣1️⃣ Why Object & Function Dependencies Cause Trouble

```jsx
useEffect(() => {
  doSomething();
}, [someObject]);
```

Even if the values inside haven’t changed, the *reference* changes — triggering the effect.

✔ Use `useMemo` or `useCallback` to memoize!

---

## 1️⃣2️⃣ useCallback to the Rescue 🛟

```jsx
const fetchPlaces = useCallback(() => {
  // fetching logic
}, [userId]);
```

Stabilizes the function reference and improves performance — especially useful inside `useEffect`! ⚙️

---

## 1️⃣3️⃣ Cleanup Function – Event Listener Example 🧽

```jsx
useEffect(() => {
  const handleScroll = () => console.log('scrolling...');
  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
```

❌ Avoid stacking up multiple listeners over time!

---

## 1️⃣4️⃣ Optimize State Updates ⚡

❌ Less optimal:
```jsx
setX(10);
setY(20);
```

✅ Better:
```jsx
setPosition({ x: 10, y: 20 });
```

For complex state, consider using `useReducer`. 🧠

---

## ✅ Summary Table

| Use Case                       | `useEffect` Needed?      |
|-------------------------------|---------------------------|
| Fetching Data                 | ✅ Yes                    |
| Browser APIs                  | ✅ Yes                    |
| Subscriptions / Listeners     | ✅ Yes (with cleanup)     |
| Derived State                 | ❌ No                     |
| Conditional Rendering         | ❌ No                     |
| Cleanup (Timers, Listeners)   | ✅ Yes                    |

---

## 🧠 Final Tips for Mastering useEffect

- 🔍 Always analyze your **dependencies**
- 🧠 Use `useCallback`/`useMemo` to control re-renders
- 🧼 Clean up effects that have side effects (timers, listeners)
- 🧪 Use React DevTools to debug effect behavior

---

Built with ❤️ while learning from Maximilian’s amazing React course.

Happy coding! 🎉
