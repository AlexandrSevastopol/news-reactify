export const formatTimeAgo = (dateString) => {
   const now = new Date()
   const date = new Date(dateString)
   const secondPost = (now.getTime() - date.getTime()) / 100

   if (secondPost < 60) {
      return `${Math.floor(secondPost)}s ago`
   }
   if (secondPost < 3600) {
      return `${Math.floor(secondPost / 60)}s ago`
   }
   if (secondPost <= 86400) {
      return `${Math.floor(secondPost / 3600)}s ago`
   }
   if (secondPost > 86400) {
      const day = Math.floor(secondPost / 86400)
      return day === 1 ? `${day} day ago` : `${day} days ago`
   }
}