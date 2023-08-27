import './index.scss'

interface BottomResultBoxProps {
  readTime: number;
  longestWord: string;
}

const BottomResultBox: React.FC<BottomResultBoxProps> = ({ readTime, longestWord }) => {
  const bottomResultBar = [
    {
      title: 'Average Reading Time:',
      value: '~ ' + readTime + ' Min.' ,
    },
    {
      title: 'Longest word:',
      value: longestWord,
    },
  ]

  return (
    <div className="bottom-result-bar">
      {bottomResultBar.map(({ title, value }) => (
        <div className="result-box" key={title}>
          <span className="box-title">{title}</span>
          <span className="box-value">{value}</span>
        </div>
      ))}
    </div>
  )
}

export default BottomResultBox
