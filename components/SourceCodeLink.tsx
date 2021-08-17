import { GithubOutlined } from '@ant-design/icons'

const SourceCodeLink = ({ className }: { className?: string }) => (
  <>
    <a
      className={className}
      href="https://github.com/bronsonavila/rainbow-dance-party/"
      rel="noreferrer"
      target="_blank"
    >
      <GithubOutlined />
      &nbsp;&nbsp;Source Code
    </a>

    <style jsx>{`
      a {
        margin: 0 0 1rem 1rem;
      }

      @media (min-width: 768px) {
        a {
          margin: 0;
        }

        a.mobile-only {
          display: none;
        }
      }
    `}</style>
  </>
)

export default SourceCodeLink
